import {
    ArrowFunction,
    FunctionDeclaration, FunctionExpression,
    ParameterDeclaration,
    Project,
    SyntaxKind,
    ClassDeclaration, MethodDeclaration,
} from "ts-morph";
import * as cfg from '../cfg.js';

export class Analyser {
    protected readonly project = new Project({
        tsConfigFilePath: cfg.ts.tsConfigFilePath,
    });
    constructor(protected readonly filePath: string) {}

    public handleFile() {
        const sourceFile = this.project.getSourceFile(this.filePath);
        if (!sourceFile) return;
        const functions = sourceFile.getFunctions();
        const arrowFunctions = sourceFile.getDescendantsOfKind(SyntaxKind.ArrowFunction);
        const functionExpressions = sourceFile.getDescendantsOfKind(SyntaxKind.FunctionExpression);
        const classMethods = sourceFile.getClasses().map(el => this.handleClasses(el)).flat();
        [...arrowFunctions, ...functions, ...functionExpressions, ...classMethods].map(el => this.handleFunction(el));
        return sourceFile.save();
    }

    protected handleClasses(property: ClassDeclaration) {
        return property.getMethods()
    }

    protected handleFunction(property: FunctionDeclaration | ArrowFunction | FunctionExpression | MethodDeclaration) {
        if (property.getReturnType().getText()) {
            property
                .setReturnType(property.getReturnType().getText())
        }
        const parameters = property.getParameters();
        if (!parameters) return;
        return parameters.map(el => this.handleParameter(el));
    }

    protected handleParameter(property: ParameterDeclaration) {
        const type = property.getType().isAny();
        if (type) {
            property.setType('unknown');
        }
    }
}
