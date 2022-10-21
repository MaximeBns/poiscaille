class PointRelais {
    a: number;
    b?: number;
    c?: number;
    d?: number;
    e?: number;
    f?: number;
    g?: number;
    h?: number;
    i?: number;
    j?: number;

    constructor(a:number,b:number,c:number,d:number,e:number,f:number,g:number,h:number,i:number,j:number) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.e = e;
        this.f = f;
        this.g = g;
        this.h = h;
        this.i = i;
        this.j = j;
    }

}

class Semaine {
    date: number;
    lockers: number;
    places: PointRelais;

    constructor(date:number, lockers: number, places: PointRelais) {
        this.date = date;
        this.lockers = lockers;
        this.places = places;
    }
}
