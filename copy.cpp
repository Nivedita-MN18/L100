//
// Created by nived on 04-01-2026.
//
#include <iostream>
using namespace std;
struct User2 {};

int main() {
    User2 a;
    User2& b = a;
    cout << &a << endl;
    cout << &b << endl;
}
