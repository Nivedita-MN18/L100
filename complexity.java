import java.io.File;

//bad code
class FileUploader {
    public void upload(String path, boolean compress, boolean encrypt, int retries) {
        // caller must coordinate everything
    }
}
//good code
interface Uploader {
    void upload(File file);
}

class SecureUploader implements Uploader {
    public void upload(File file) {
        compress(file);
        encrypt(file);
        send(file);
    }

    private void compress(File f) {}
    private void encrypt(File f) {}
    private void send(File f) {}
}
