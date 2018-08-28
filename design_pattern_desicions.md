Design Patterns Desicions
=========================

## Fail early and fail loud
The main function for adding files has a require at the beggining to prevent a call with  a file that's already owned by a user.

## Mortal
The contract is using OpenZeppellin `Destructible` contract

## Short Circuit
The contract is using OpenZeppellin `Pausable` contract
