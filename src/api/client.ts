interface IClientProps {
  method: "GET" | "POST";
  url: string;
  body?: string;
}

export const client = async ({ method, url, body }: IClientProps) => {
  try {
    const response = await fetch(url, { method, body });
    const json = await response.json();

    return json;
  } catch (err) {
    throw new Error("Request failed");
  }
};
