function managerEntries(entry = []) {
  return [...entry, require.resolve('./dist/esm/manager')]
}

module.exports = { managerEntries }
