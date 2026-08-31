import { ArrowRight } from './icons.jsx'

export default function NotFound() {
  return (
    <section className="nf">
      <div className="container nf-inner reveal">
        <div className="nf-code" aria-hidden="true">404</div>
        <span className="eyebrow">Error</span>
        <h1 className="h1">
          Page <mark>not found</mark>
        </h1>
        <p className="lead">
          The page you&rsquo;re looking for doesn&rsquo;t exist, or has been moved to a new address.
        </p>
        <div className="nf-cta">
          <a className="btn btn-primary" href="#/">
            Back to Home <ArrowRight size={16} />
          </a>
          <a className="btn btn-ghost" href="#/contact">Contact Us</a>
        </div>
      </div>
    </section>
  )
}
