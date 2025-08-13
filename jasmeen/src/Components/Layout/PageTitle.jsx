export default function PageTitle({title}){
    return(
        <>
              <section
    className="hero-wrap hero-wrap-2"
    style={{ backgroundImage: 'url("/assets/images/bg_2.jpg")' }}
    data-stellar-background-ratio="0.5"
  >
    <div className="overlay" />
    <div className="container">
      <div className="row no-gutters slider-text align-items-end">
        <div className="col-md-9 ftco-animate pb-5">
          <p className="breadcrumbs mb-2">
            <span className="mr-2">
              <a href="index.html">
                Home <i className="ion-ios-arrow-forward" />
              </a>
            </span>{" "}
            <span>
              {title} <i className="ion-ios-arrow-forward" />
            </span>
          </p>
          <h1 className="mb-0 bread">{title}</h1>
        </div>
      </div>
    </div>
  </section>
        </>
    )
}