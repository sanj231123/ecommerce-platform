function BannerSection() {

  return (

    <div
      style={{
        width: "90%",
        margin: "50px auto"
      }}
    >

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px"
        }}
      >

        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b"
          alt="fashion"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"
          alt="mobile"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />

        <img
          src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853"
          alt="laptop"
          style={{
            width: "100%",
            height: "300px",
            objectFit: "cover",
            borderRadius: "12px"
          }}
        />

      </div>

    </div>

  );

}

export default BannerSection;
