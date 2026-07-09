/* ==========================================================
   PORTFOLIO - LUCIANO TORRES VERA
==========================================================*/

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MODO OSCURO
    ========================== */

    const botonModo = document.getElementById("modoOscuro");

    if(localStorage.getItem("modo") === "oscuro"){

        document.body.classList.add("dark");

        botonModo.innerHTML =
        '<i class="fa-solid fa-sun"></i>';

    }

    botonModo.addEventListener("click",()=>{

        document.body.classList.toggle("dark");

        if(document.body.classList.contains("dark")){

            botonModo.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

            localStorage.setItem("modo","oscuro");

        }else{

            botonModo.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

            localStorage.setItem("modo","claro");

        }

    });


    /* ==========================
       ANIMACIONES SCROLL
    ========================== */

    const elementos = document.querySelectorAll(
        ".card,.box,.timeline-card,.exp-card,.feature,.contact-card,.formulario"
    );

    const observador = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.opacity="1";
                entry.target.style.transform="translateY(0)";
                entry.target.style.transition=".8s";

            }

        });

    },{

        threshold:0.15

    });

    elementos.forEach(el=>{

        el.style.opacity="0";
        el.style.transform="translateY(40px)";

        observador.observe(el);

    });


    /* ==========================
       ANIMAR BARRAS
    ========================== */

    const barras = document.querySelectorAll(".progress span");

    const animarBarras = new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                entry.target.style.width =
                entry.target.classList.contains("sql") ? "90%" :
                entry.target.classList.contains("python") ? "88%" :
                entry.target.classList.contains("postgis") ? "90%" :
                entry.target.classList.contains("qgis") ? "95%" :
                entry.target.classList.contains("arcgis") ? "88%" :
                entry.target.classList.contains("excel") ? "85%" :
                entry.target.classList.contains("git") ? "60%" :
                "40%";

            }

        });

    },{

        threshold:.4

    });

    barras.forEach(barra=>{

        barra.style.width="0";

        animarBarras.observe(barra);

    });


    /* ==========================
       BOTÓN ARRIBA
    ========================== */

    const botonArriba = document.querySelector(".topo");

    window.addEventListener("scroll",()=>{

        if(window.scrollY>500){

            botonArriba.style.opacity="1";
            botonArriba.style.visibility="visible";

        }else{

            botonArriba.style.opacity="0";
            botonArriba.style.visibility="hidden";

        }

    });


    /* ==========================
       MENÚ ACTIVO
    ========================== */

    const sections=document.querySelectorAll("section");

    const navLinks=document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll",()=>{

        let current="";

        sections.forEach(section=>{

            const top=section.offsetTop-120;

            if(scrollY>=top){

                current=section.getAttribute("id");

            }

        });

        navLinks.forEach(link=>{

            link.classList.remove("activo");

            if(link.getAttribute("href")==="#"+current){

                link.classList.add("activo");

            }

        });

    });

/* ===========================
   EFECTO HERO
=========================== */

const hero=document.querySelector(".hero");

hero.style.opacity="0";
hero.style.transform="translateY(40px)";

setTimeout(()=>{

    hero.style.transition="1s";
    hero.style.opacity="1";
    hero.style.transform="translateY(0)";

},300);


/* ===========================
   CARRUSEL INFINITO
=========================== */

const gallery=document.querySelector(".gallery");
const next=document.querySelector(".next");
const prev=document.querySelector(".prev");

if(gallery){

const cards=[...gallery.children];

const visibles=3;

// Clonar primeras
cards.slice(0,visibles).forEach(card=>{
gallery.appendChild(card.cloneNode(true));
});

// Clonar últimas
cards.slice(-visibles).reverse().forEach(card=>{
gallery.insertBefore(card.cloneNode(true),gallery.firstChild);
});

const ancho=cards[0].offsetWidth+25;

gallery.scrollLeft=ancho*visibles;

// Flecha derecha

next.addEventListener("click",()=>{

gallery.scrollBy({
left:ancho,
behavior:"smooth"
});

});

// Flecha izquierda

prev.addEventListener("click",()=>{

gallery.scrollBy({
left:-ancho,
behavior:"smooth"
});

});

// Reacomodar automáticamente

gallery.addEventListener("scroll",()=>{

const max=gallery.scrollWidth-gallery.clientWidth;

if(gallery.scrollLeft<=0){

gallery.scrollLeft=max-(ancho*visibles*2);

}

if(gallery.scrollLeft>=max){

gallery.scrollLeft=ancho*visibles;

}

});

// Scroll con rueda

gallery.addEventListener("wheel",(e)=>{

e.preventDefault();

gallery.scrollBy({

left:e.deltaY,

behavior:"smooth"

});

});

// Swipe celular

let inicioX=0;

gallery.addEventListener("touchstart",(e)=>{

inicioX=e.touches[0].clientX;

});

gallery.addEventListener("touchend",(e)=>{

let fin=e.changedTouches[0].clientX;

let diferencia=inicioX-fin;

if(Math.abs(diferencia)>40){

gallery.scrollBy({

left:diferencia,

behavior:"smooth"

});

}

});

}


/* ===========================
   LIGHTBOX
=========================== */

const lightbox=document.getElementById("lightbox");
const imagenGrande=document.getElementById("imagenAmpliada");
const cerrar=document.getElementById("cerrar");

gallery.addEventListener("click",(e)=>{

if(e.target.tagName==="IMG"){

lightbox.style.display="flex";
imagenGrande.src=e.target.src;

}

});

cerrar.addEventListener("click",()=>{

    lightbox.style.display="none";

});

lightbox.addEventListener("click",(e)=>{

    if(e.target===lightbox){

        lightbox.style.display="none";

    }

});

});