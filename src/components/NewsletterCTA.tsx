export default function NewsletterCTA() {
  return (
    <section className="rounded-3xl border border-ink/10 bg-white/70 p-8 shadow-soft">
      <div className="max-w-2xl space-y-4">
        <p className="text-xs uppercase tracking-[0.4em] text-ink/50">Newsletter</p>
        <h2 className="text-2xl font-semibold text-ink">Letters from the writing desk.</h2>
        <p className="text-sm text-ink/70">
          Receive occasional dispatches about new releases, essays, and studio notes from Dan A Rai.
        </p>
        <form className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Your email"
            className="w-full rounded-full border border-ink/20 bg-white px-4 py-2 text-sm"
          />
          <button
            type="button"
            className="rounded-full bg-ink px-6 py-2 text-sm uppercase tracking-[0.2em] text-parchment"
          >
            Join
          </button>
        </form>
      </div>
    </section>
  );
}
