{result && (
  <>
    <button
      onClick={handleDownloadPDF}
      style={{
        marginTop: '1rem',
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '0.5rem 1rem',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      }}
    >
      📄 결과 PDF로 저장
    </button>

    <div
      id="result-area"
      style={{
        marginTop: '1rem',
        whiteSpace: 'pre-wrap',
        background: '#f4f4f4',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <h3>✅ 추천 결과:</h3>
      <p>{result}</p>
    </div>
  </>
)}
