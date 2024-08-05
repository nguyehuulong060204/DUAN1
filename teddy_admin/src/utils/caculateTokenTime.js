export const calculateTokenExpirationTime = () => {
    const expirationTimeInDays = 1; // Thời gian hết hạn token sau 1 ngày
    const currentDate = new Date();
    const expirationDate = new Date(currentDate.getTime() + expirationTimeInDays * 24 * 60 * 60 * 1000); // Chuyển đổi thành mili giây
    return expirationDate.toISOString(); // Chuyển đổi thành chuỗi ISO để lưu trữ
  };