export const {hasOwnProperty} = Object.prototype;

export function getProperty(o,k) {
    return hasOwnProperty.call(o, k) ? o[k] : void 0;
}

export function assign(dest, src) {
    return Object.assign({}, dest, src);
}

export function copy(src) {
    return Object.assign({}, src);
}


