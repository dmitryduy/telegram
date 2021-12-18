const debounce = (f=()=>{}, ms=0) => {
    let isCooldown  = false;

    return function () {
        if (isCooldown ) return;

        f.apply(this, arguments);

        isCooldown  = true;

        setTimeout(() => isCooldown  = false, ms);
    };
}

export default debounce()