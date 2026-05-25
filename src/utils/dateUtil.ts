const getDaysInMonth = (y: number | null, m: number | null) => {
    if (!m) return 31
    if (!y) {
        return m === 2? 29 : new Date(2000, m, 0).getDate()
    }
    return new Date(y,m,0).getDate()
};


export {getDaysInMonth}
