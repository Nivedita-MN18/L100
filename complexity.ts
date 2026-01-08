interface Uploader {
    upload(data: string): void;
}
//good code

class SecureUploader implements Uploader {
    upload(data: string) {
        this.compress(data);
        this.encrypt(data);
        this.send(data);
    }

    private compress(_: string) {}
    private encrypt(_: string) {}
    private send(_: string) {}
}
