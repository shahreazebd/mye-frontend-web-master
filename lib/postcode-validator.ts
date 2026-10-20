import axios from "axios";

export default async function postcodeValidator(postcode: string) {
  try {
    const data = await axios.get(`https://api.postcodes.io/postcodes/${postcode}`);
    return { success: true, postcode: data.data.result.postcode };
  } catch (error) {
    return { success: false, postcode: postcode };
  }
}
