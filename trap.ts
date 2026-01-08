type User = { role: string };

function process(user: User) {
    user.role = "ADMIN";
}

const u: User = { role: "USER" };
process(u);

console.log(u.role); // ADMIN
