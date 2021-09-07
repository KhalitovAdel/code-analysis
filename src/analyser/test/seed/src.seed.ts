// @ts-nocheck
type User = {name: string};
const test1 = async (_, context) => null;

const test2 = (_, context) => {
    return null;
};

const test3 = function (_, context) {
    return null;
}

function test4(_, conText) {
    return null;
}

function test5(_, __, context: unknown, user: User): unknown {
    return null;
}

class Test {
    method(_, __, context) {
        return null;
    }
}

test( _, context);
