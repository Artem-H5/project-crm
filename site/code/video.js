const video = JSON.parse(localStorage.video);
console.log(video)

if (!Array.isArray(video)) {
    throw Error("...")
}
const videoEl = video.map(({ videoName, id, url, description, keywords, poster }) => {
    return `
    <div class="video_wrap col-xl-4 col-lg-6 col-md-12 col-sm-12">
        <div class='video'>
            <h3 class="video-name">${videoName}</h3>
            <video id="${id}" controls poster="${poster}">
                ${url.startsWith("/video") ? `<source src="/video/${url}">` : `<source src="${url}">`}
            </video>
            <p class="video-description">
            ${description}
            </p>
            <div>
            ${keywords.map((el) => {
        return `<span class="badge bg-secondary">${el}</span>`
    }).join("")}
            </div>
        </div>
    </div>
    `
})

document.querySelector(".row")
    .insertAdjacentHTML("beforeend", videoEl.join(""));

