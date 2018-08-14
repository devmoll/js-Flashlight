class TransformationMatrix
{
    constructor()
    {
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.a = 1;
        this.b = 1;
        this.c = 1;
    }

    translate(x,y,z)
    {
        this.x += x;
        this.y += y;
        this.z += z;
    }

    setTranslation(x,y,z)
    {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    scale(a,b,c)
    {
        this.a *= a;
        this.b *= b;
        this.c *= c;
    }

    setScale(a,b,c)
    {
        this.a = a;
        this.b = b;
        this.c = c;
    }
    setCompleteScale(a)
    {
        this.a = a;
        this.b = a;
        this.c = a;
    }

    getMatrixAsArray()
    {
        return [this.a,0,0,this.x,0,this.b,0,this.y,0,0,this.c,this.z,0,0,0,1];
    }
}

class Vector4
{
    constructor(x,y,z,w = 1)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    translate(x,y,z,w = 1)
    {
        this.x += x;
        this.y += y;
        this.z += z;
        this.w += w;
    }

    setValues(x,y,z,w = 1)
    {
        this.x = x;
        this.y = y;
        this.z = z;
        this.w = w;
    }

    getVectorAsArray()
    {
        return [this.x,this.y,this.z,this.w];
    }
}

class PerspectiveVector
{
    constructor(aspect)
    {
        this.x = 1;
        this.y = aspect;
        this.z = 1;
        this.w = 1;
    }

    updateAspectRatio(aspect)
    {
        this.y = aspect;
    }

    getVectorAsArray()
    {
        return [this.x,this.y,this.z,this.w];
    }
}