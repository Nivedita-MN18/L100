// #include <iostream>
// using namespace std;
// struct User {};
// int main() {
//     User a;
//     User b = a;
//     cout << &a << endl;
//     cout << &b << endl;
// }

#include <iostream>
using namespace std;

struct User {
    int age;
};

int main() {
    User u{20};

    User& ref = u;     // reference alias
    User* ptr = &u;    // pointer alias

    ref.age = 25;

    cout << u.age << endl;   // 25
    cout << ptr->age << endl; // 25
}
