function Boundaries(topleft, bottomright) {
    this.topleft = topleft;
    this.bottomright = bottomright;

    this.insideBoundaries = function (point) {
        if (point === undefined || point === null) return false;
        if ((point.x >= this.topleft.x) && (point.y >= this.topleft.y )) {
            if ((point.x <= this.bottomright.x) && (point.y <= this.bottomright.y)) {
                return true;
            }
        }
        return false;
    };
}
