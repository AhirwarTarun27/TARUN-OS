def is_triangle_handler(a,b,c):
    return a > 0 and b > 0 and c > 0 and a + b >= c and b + c >= a and a + c >= b

def equilateral(sides):
    a = sides[0]
    b = sides[1]
    c = sides[2]
    is_triangle = is_triangle_handler(a,b,c)
    return is_triangle and a == b and b == c and c == a


def isosceles(sides):
    a = sides[0]
    b = sides[1]
    c = sides[2]
    is_triangle = is_triangle_handler(a,b,c)
    return is_triangle and (a == b or b == c or a == c)


def scalene(sides):
    a = sides[0]
    b = sides[1]
    c = sides[2]
    is_triangle = is_triangle_handler(a,b,c)
    return is_triangle and a != b and b !=c and c != a