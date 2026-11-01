<script lang="ts">
  import update from '#lib/data/engineering-4471.json';
</script>
<section aria-label="Engineering update">
  <h2>Engineering update: #{update.ticket} closed {update.closedOn}</h2>
  <table>
    <thead><tr><th>Problem</th><th>Disposition</th><th>Engineering's reason</th></tr></thead>
    <tbody>{#each update.outcomes as outcome}<tr><td>{outcome.cause}</td><td>{outcome.status}</td><td>{outcome.detail}</td></tr>{/each}</tbody>
  </table>
  <p><a href={update.source}>Source: the course's engineering update</a>, observed {update.observedOn}. These are the desk's reported outcomes, not production tests run by this harness.</p>
  <p>The parser ticket is completed. The hint ticket is not planned because the form was retired, not fixed. The separate timing investigation has no verified disposition in this update and remains open.</p>
</section>
