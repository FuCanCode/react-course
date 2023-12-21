export default function setRdmColor() {
  const rdmValue = Math.random() * 360;
  //   console.log(rdmValue);
  return { backgroundColor: `hsl(${rdmValue}, 63%, 46%)` };
}
