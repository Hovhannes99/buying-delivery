import {useEffect, useRef} from "react";


const WelcomeAnimation = () => {
     const text1:any = useRef(null);
     const text2:any = useRef(null)


    const texts = [
        "Wellcome",
        "to",
        "G",
        "Group",
        ":)"
    ];

    const morphTime = 1;
    const cooldownTime = 0.25;

    let textIndex:any = texts.length - 1;
    let time:any = new Date();
    let morph = 0;
    let cooldown = cooldownTime;



    function doMorph() {
        morph -= cooldown;
        cooldown = 0;

        let fraction = morph / morphTime;

        if (fraction > 1) {
            cooldown = cooldownTime;
            fraction = 1;
        }

        setMorph(fraction);
    }

    function setMorph(fraction:any) {
        text2.current?.attributeStyleMap.set("filter", `blur(${Math.min(8 / fraction - 8, 100)}px)`);
        text2.current?.attributeStyleMap.set("opacity", `${Math.pow(fraction, 0.4) * 100}%`)

        fraction = 1 - fraction;
        text1.current?.attributeStyleMap.set("filter", `blur(${Math.min(8 / fraction - 8, 100)}px)`);
        text1.current?.attributeStyleMap.set("opacity", `${Math.pow(fraction, 0.4) * 100}%`);

        text1.current.innerText = texts[textIndex % texts.length];
        text2.current.innerText = texts[(textIndex + 1) % texts.length];
    }

    function doCooldown() {
        morph = 0;
        text2.current?.attributeStyleMap.set("filter","");
        text2.current?.attributeStyleMap.set("opacity", "");

        text1.current?.attributeStyleMap.set("filter","");
        text2.current?.attributeStyleMap.set("opacity", '0%');

    }

    function animate() {
        requestAnimationFrame(animate);

        let newTime:any = new Date();
        let shouldIncrementIndex = cooldown > 0;
        let dt = (newTime - time) / 1000;
        time = newTime;

        cooldown -= dt;

        if (cooldown <= 0) {
            if (shouldIncrementIndex) {
                textIndex++;
            }

            doMorph();
        } else {
            doCooldown();
        }
    }
    useEffect(()=>{
        if (!text1.current.innerText  &&  !text2.current.innerText){
            text1.current.innerText = texts[textIndex % texts.length];
            text2.current.innerText = texts[(textIndex + 1) % texts.length];
            console.log( text1.current.innerText)
            // animate()

        }
    },[])
    return (
        <>
            <div id="container">
                <span id="text1" ref={text1}></span>
                <span id="text2" ref={text2}></span>
            </div>

            <svg id="filters">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0
									0 1 0 0 0
									0 0 1 0 0
									0 0 0 255 -140"/>
                    </filter>
                </defs>
            </svg>
        </>

    )

}

export default WelcomeAnimation