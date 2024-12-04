export async function onRequestGet() {
    const all = await fetch('https://film.fershad.com/all.json').then(res => res.json());

    all.images = all.images.filter(image => image.description && image.portrait);
    const random = all.images[Math.floor(Math.random() * all.images.length)];

    return new Response(JSON.stringify(random), {
        headers: {
            "content-type": "application/json",
        },
    });
  }