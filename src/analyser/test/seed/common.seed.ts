// @ts-nocheck
type User = {name: string};
const test1 = async (_: unknown, context: unknown): Promise<null> => null;

const test2 = (_: unknown, context: unknown): null => {
    return null;
};

const test3 = function (_: unknown, context: unknown): null {
    return null;
}

function test4(_: unknown, conText: unknown): null {
    return null;
}

function test5(_: unknown, __: unknown, context: unknown, user: User): unknown {
    return null;
}

class Test {
    method(_: unknown, __: unknown, context: unknown): null {
        return null;
    }
}

test( _, context);
