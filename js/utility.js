// Get current scroll position
document.addEventListener("DOMContentLoaded", () => {
    adjustOffset();
    const hero = document.getElementById("hero");
    const herosize = hero.getBoundingClientRect();
    if (herosize.left !== 0) hero.style.left = `-${herosize.left}px`;
    updateBackgroundPosition();
    document.getElementById("comp-normal").classList.remove("d-none");
    document.getElementById("comp-univ").classList.add("d-none");
})

document.addEventListener("resize", ()=>{
    adjustOffset();
    updateBackgroundPosition();
})


window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollTop / scrollHeight) * 100;
    document.getElementById("progressBar").style.width = `${Math.round(scrollPercentage)}%`;

    // Check if any nav link has the 'active' class
    const hasActiveLink = document.querySelector(".navbar-nav .nav-link.active") !== null;

    // Only refresh ScrollSpy if no link is active to avoid unnecessary calls
    if (!hasActiveLink) {
        bootstrap.ScrollSpy.getInstance(document.querySelector("main"))?.refresh();
    }
});

document.querySelectorAll('.custom-tabs .nav-link').forEach(button => {
    button.addEventListener('click', () => {
        const tab = button.getAttribute('data-tab');

        // Remove active classes from all buttons and panes
        document.querySelectorAll('.custom-tabs .nav-link').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));

        // Add active classes to selected ones
        button.classList.add('active');
        document.getElementById(tab).classList.add('active');
    });
});

function adjustOffset(){
    const navbarHeight = document.getElementById('myScrollspy').offsetHeight;
    document.documentElement.style.scrollPaddingTop = `${navbarHeight+20}px`;
}

function updateSwitch(node){
    document.getElementById("comp-normal").classList.toggle("d-none");
    document.getElementById("comp-univ").classList.toggle("d-none");
}

function updateBackgroundPosition() {
    const container = document.getElementById('comps');
    const bg = document.querySelector('.dark-background');

    if (container && bg) {
        const containerOffset = container.getBoundingClientRect().left;
        bg.style.transform = `translateX(-${containerOffset}px)`;
    }
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
        .then(() => {
            console.log(`Email copié dans le presse-papier.`);
            alert(`Email copié dans le presse-papier.`);
        })
        .catch((error) => {
            console.error(`L'email n'a pas pu être copié dans le presse-papier.`);
        });
}