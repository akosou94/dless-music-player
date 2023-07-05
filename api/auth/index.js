const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const AuthFetch = async (url, parms = null) => {
  try {
    const postResponse = await fetch(`${API_URL}/api${url}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(parms),
    });
    return postResponse;
  } catch (error) {
    console.log(error);
  }
};
