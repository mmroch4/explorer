export async function search(login) {
  if (!login || typeof login !== "string") {
    console.log("Invalid login");

    return;
  }

  const uri = "https://api.github.com/users/USERNAME";
  const encodedLogin = encodeURIComponent(login);

  const encodedUri = uri.replace("USERNAME", encodedLogin);

  try {
    const response = await fetch(encodedUri, {
      headers: {
        Authorization:
          "Bearer REPLACE_ME",
      },
    });

    if (!response.ok) {
      throw new Error(`User (@${login}) does not exist`);
    }

    const { name, public_repos, followers, html_url } = await response.json();

    return {
      name,
      login,
      repos: public_repos,
      followers,
      url: html_url,
      pictureUrl: html_url + ".png",
    };
  } catch (error) {
    console.error(error.message);

    return false;
  }
}
