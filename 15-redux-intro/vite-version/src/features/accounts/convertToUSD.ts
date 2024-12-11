export async function convertToUSD(
  amount: number,
  currency: string
): Promise<number> {
  const params = new URLSearchParams({
    base: currency,
    symbols: "USD",
  });
  const url = new URL(`https://api.frankfurter.dev/v1/latest`);

  url.search = params.toString();

  try {
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const res = await fetch(url.toString());
    const data = await res.json();

    const rate = data.rates.USD;

    return amount * rate;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
