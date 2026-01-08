import { Project, ClassDeclaration, SyntaxKind } from "ts-morph";

type CKMetrics = {
    clsName: string; fileName: string; WMC: number; DIT: number;
    NOC: number; CBO: number; RFC: number; LCOM: number; };

const inputFiles = process.argv.slice(2);
if (inputFiles.length === 0) {
    console.error("give the file names as cmd-line args");
    process.exit(1);
}

const project = new Project();
for (const f of inputFiles) {
    project.addSourceFileAtPath(f);
}
const srcFiles = project.getSourceFiles();

const allClasses: ClassDeclaration[] = [];
for (const sf of srcFiles) {
    allClasses.push(...sf.getClasses());
}

const clsParent = new Map<string, string | null>();
const childrenCount = new Map<string, number>();

for (const cls of allClasses) {
    const name = cls.getName();
    if (!name) continue;
    const base = cls.getBaseClass();
    const parentName: string | null = base ? base.getName() || null : null;
    clsParent.set(name, parentName);
}

for (const cls of allClasses) {
    const name = cls.getName();
    if (!name) continue;
    const parentName = clsParent.get(name);
    if (parentName) {
        const current = childrenCount.get(parentName) ?? 0;
        childrenCount.set(parentName, current + 1);
    }
}

const calcDIT = (clsName: string): number => {
    let depth = 0;
    let current = clsParent.get(clsName) ?? null;
    while (current !== null) {
        depth++;
        current = clsParent.get(current) ?? null;
    }
    return depth;
};

const calcCBO = (cls: ClassDeclaration): number => {
    const typeNames = new Set<string>();

    for (const prop of cls.getProperties()) {
        const typeNode = prop.getTypeNode();
        if (typeNode) typeNames.add(typeNode.getText());
    }

    for (const m of cls.getMethods()) {
        const rt = m.getReturnTypeNode();
        if (rt) typeNames.add(rt.getText());
        for (const p of m.getParameters()) {
            const tn = p.getTypeNode();
            if (tn) typeNames.add(tn.getText());
        }
    }

    const newExprs = cls.getDescendantsOfKind(SyntaxKind.NewExpression);
    for (const ne of newExprs) {
        const expr = ne.getExpression();
        typeNames.add(expr.getText());
    }
    const ext = cls.getExtends();
    if (ext) typeNames.add(ext.getExpression().getText());
    for (const impl of cls.getImplements()) {
        typeNames.add(impl.getExpression().getText());
    }

    const primitives = [
        "number", "string", "boolean", "any","void", "unknown", "never", "object", "Array", "Promise"
    ];
    for (const p of primitives) typeNames.forEach(t => {
        if (t === p || t.startsWith(p + "<")) typeNames.delete(t);
    });

    const clsName = cls.getName();
    if (clsName) {
        typeNames.forEach(t => {
            if (t === clsName || t.startsWith(clsName + "<")) typeNames.delete(t);
        });
    }

    return typeNames.size;
};

const analyzeClass = (cls: ClassDeclaration): CKMetrics | null => {
    const clsName = cls.getName();
    if (!clsName) return null;

    const fileName = cls.getSourceFile().getFilePath();
    const fields = cls.getProperties().map(p => p.getName());
    const methods = cls.getMethods();
    const rfcSet = new Set<string>();
    let WMC = 0;

    for (const m of methods) {
        WMC++;
        rfcSet.add(m.getName());
    }

    const methodFieldUsage: Array<Set<string>> = [];
    for (const m of methods) {
        const usedFields = new Set<string>();
        const body = m.getBody();
        if (body) {
            const walkNodes = body.getDescendants();
            for (const n of walkNodes) {
                if (n.getKind() === SyntaxKind.PropertyAccessExpression) {
                    const pae = n;
                    const anyExp: any = pae;
                    const expr = anyExp.getExpression();
                    if (expr && expr.getKind && expr.getKind() === SyntaxKind.ThisKeyword) {
                        const nameNode = anyExp.getNameNode();
                        const fieldName = nameNode?.getText();
                        if (fieldName && fields.includes(fieldName)) {
                            usedFields.add(fieldName);
                        }
                    }
                }
                if (n.getKind() === SyntaxKind.CallExpression) {
                    const ce: any = n;
                    const expr = ce.getExpression();
                    if (expr.getKind && expr.getKind() === SyntaxKind.PropertyAccessExpression) {
                        const nameNode = expr.getNameNode();
                        if (nameNode) rfcSet.add(nameNode.getText());
                    } else {
                        rfcSet.add(expr.getText());
                    }
                }
            }
        }
        methodFieldUsage.push(usedFields);
    }

    let P = 0;
    let Q = 0;
    for (let i = 0; i < methodFieldUsage.length; i++) {
        for (let j = i + 1; j < methodFieldUsage.length; j++) {
            const set1 = methodFieldUsage[i];
            const set2 = methodFieldUsage[j];
            let sharesField = false;
            for (const f of set1) {
                if (set2.has(f)) {
                    sharesField = true;
                    break;
                }
            }
            if (sharesField) Q++;
            else P++;
        }
    }

    let LCOM = 0;
    if (P > Q) LCOM = P - Q;
    const DIT = calcDIT(clsName);
    const NOC = childrenCount.get(clsName) ?? 0;
    const CBO = calcCBO(cls);
    const RFC = rfcSet.size;

    return { clsName, fileName, WMC, DIT, NOC, CBO, RFC, LCOM };
};
const allMetrics: CKMetrics[] = [];
for (const sf of srcFiles) {
    const classes = sf.getClasses();
    for (const cls of classes) {
        const m = analyzeClass(cls);
        if (m) allMetrics.push(m);
    }
}
console.log("CK metrics for classes in:");
for (const f of inputFiles) console.log(" - " + f);
for (const r of allMetrics) {
    console.log(
        r.clsName + " WMC: " + r.WMC + ", DIT: " + r.DIT + ", NOC: " + r.NOC + ", CBO: " + r.CBO + ", RFC: " + r.RFC + ", LCOM: " + r.LCOM);
}
