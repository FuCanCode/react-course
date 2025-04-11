import styled from "styled-components";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addCabin, uploadCabinImage } from "../../services/apiCabins";
import { NewCabin } from "../../entities";
import { supabaseUrl } from "../../services/supabase";

const FormRow = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 24rem 1fr 1.2fr;
  gap: 2.4rem;

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }

  &:has(button) {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

const Label = styled.label`
  font-weight: 500;
`;

const ErrorElement = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

interface CabinFormInputs {
  name: string;
  maxCapacity: number;
  regularPrice: number;
  discount: number;
  description: string;
  image: FileList;
}

function CreateCabinForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CabinFormInputs>({ mode: "onSubmit" });

  const queryClient = useQueryClient();

  const { isLoading: isAddingCabin, mutate: addCabinRow } = useMutation({
    mutationFn: addCabin,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      toast.success("Cabin successfully added");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const onSubmit: SubmitHandler<CabinFormInputs> = async (data) => {
    console.log("Submitted:", data);

    await uploadCabinImage(data.image[0]);

    const newCabinRow: NewCabin = {
      ...data,
      image: `${supabaseUrl}/storage/v1/object/public/cabin-images/${data.image[0].name}`,
    };

    addCabinRow(newCabinRow);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow>
        <Label htmlFor="name">Cabin name</Label>
        <Input
          type="text"
          id="name"
          {...register("name", {
            required: "Required",
            minLength: {
              value: 3,
              message: "Name must be of at least 3 Characters.",
            },
          })}
        />
        {errors.name && <ErrorElement>{errors.name.message}</ErrorElement>}
        {/* <Input type="text" id="name" /> */}
      </FormRow>

      <FormRow>
        <Label htmlFor="maxCapacity">Maximum capacity</Label>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "Required",
            min: { value: 1, message: "At least one guest must be provided." },
            max: { value: 16, message: "Capicity is limited to 16" },
            valueAsNumber: true,
          })}
        />
        {errors.maxCapacity && (
          <ErrorElement>{errors.maxCapacity.message}</ErrorElement>
        )}
        {/* <Input type="number" id="maxCapacity" /> */}
      </FormRow>

      <FormRow>
        <Label htmlFor="regularPrice">Regular price</Label>
        <Input
          type="number"
          id="regualrPrice"
          {...register("regularPrice", {
            required: "Required",
            valueAsNumber: true,
            min: {
              value: 15,
              message:
                "Come on, that's too cheap. Please charge at least 15 bucks!",
            },
          })}
        />
        {errors.regularPrice && (
          <ErrorElement>{errors.regularPrice.message}</ErrorElement>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="discount">Discount</Label>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          {...register("discount", { min: 0, valueAsNumber: true })}
        />
        {errors.discount && (
          <ErrorElement>{errors.discount.message}</ErrorElement>
        )}
      </FormRow>

      <FormRow>
        <Label htmlFor="description">Description for website</Label>
        <Textarea
          defaultValue=""
          id="description"
          {...register("description", { required: "Required" })}
        />
        {errors.description && (
          <ErrorElement>{errors.description.message}</ErrorElement>
        )}
        {/* <Textarea type="number" id="description" defaultValue="" /> */}
      </FormRow>

      <FormRow>
        <Label htmlFor="image">Cabin photo</Label>
        <FileInput
          type="file"
          id="image"
          {...register("image", { required: "Required" })}
        />
        {errors.image && <ErrorElement>{errors.image.message}</ErrorElement>}
        {/* <FileInput id="image" type="file" accept="image/*" /> */}
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button $variation="secondary" type="reset">
          Cancel
        </Button>
        <Button type="submit" disabled={isAddingCabin}>
          Add cabin
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
