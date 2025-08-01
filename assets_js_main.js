async function searchGDV(event) {
  event.preventDefault();
  
  const input = document.getElementById('searchInput').value.trim();
  const resultBox = document.getElementById('result');
  const resultText = document.getElementById('resultText');

  if (!input) return;

  try {
    const res = await fetch('data/gdv.json');
    const data = await res.json();

    const found = data.find(item =>
      item.phone.includes(input) || item.facebook.includes(input)
    );

    if (found) {
      resultText.innerHTML = `✅ Tài khoản đã cọc: <b>${found.name}</b><br>
                              Số tiền bảo hiểm: <b>${found.amount}</b> VNĐ<br>
                              Ngày cọc: ${found.date}`;
    } else {
      resultText.innerHTML = `⚠️ Không tìm thấy dữ liệu. Vui lòng cẩn thận trước khi giao dịch!`;
    }

    resultBox.style.display = 'block';
  } catch (error) {
    resultText.innerHTML = `Lỗi tải dữ liệu: ${error}`;
    resultBox.style.display = 'block';
  }
}