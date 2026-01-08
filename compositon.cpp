//
// Created by nived on 07-01-2026.
//
#include <iostream>
using namespace std;

class Logger {
public:
    void log(string msg) {
        cout << msg << endl;
    }
};

class AuditService {
    Logger logger;
public:
    void audit(string event) {
        logger.log(event); // delegation
    }
};

int main() {
    AuditService a;
    a.audit("LOGIN");
}
