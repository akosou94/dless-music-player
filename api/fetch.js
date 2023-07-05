const API_URL = process.env.NEXT_PUBLIC_API_URL;
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN;

const Api = async (
  url = '',
  method = 'GET',
  params = null,
  token = API_TOKEN
) => {
  try {
    let body = null;
    let headers = {
      Authorization: `Bearer ${token}`,
    };

    if (params) {
      const form = new FormData();

      form.append('data', JSON.stringify(params.data));

      if ('files' in params) {
        for (const file in params.files) {
          form.append(`files.${file}`, params.files[file]);
        }
      }

      body = form;

      if (params.json) {
        headers = {
          ...headers,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };
        body = JSON.stringify(params.json);
      }
    }

    const resp = await fetch(`${API_URL}/api/${url}`, {
      method,
      headers,
      body,
    });

    console.info('success', { ok: resp.ok, status: resp.status });

    return await resp.json();
  } catch (err) {
    console.error(err);
  }
};

export default Api;
