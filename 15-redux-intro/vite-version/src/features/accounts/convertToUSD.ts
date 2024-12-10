export async function convertToUSD(
  amount: number,
  currency: string
): Promise<number> {
  // set the URL
  const params = new URLSearchParams({
    base: currency,
    symbols: "USD",
  });
  const url = new URL(`https://api.frankfurter.dev/v1/latest`);

  url.search = params.toString();

  try {
    const res = await fetch(url.toString());
    const data = await res.json();

    const rate = data.rates.USD;

    return amount * rate;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
