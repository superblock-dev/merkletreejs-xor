/* eslint camelcase: 0 */

const test = require('tape')
const keccak256 = require('keccak256')
const { MerkleTree } = require('../dist')

test('verify multiproof', t => {
  t.plan(1)
  const leaves = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17'].map(keccak256)
  const tree = new MerkleTree(leaves, keccak256)
  tree.print()
  console.log(tree.getHexLayers())
  const root = tree.getHexRoot()
  const proofLeaves = ['1', '2', '3'].map(keccak256)
  const proof = tree.getMultiProof(proofLeaves)
  const proofFlags = tree.getProofFlags(proofLeaves, proof)
  t.true(tree.verifyMultiProofWithFlags(root, proofLeaves, proof, proofFlags))
})
