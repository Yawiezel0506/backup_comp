# Solution Tricks and Techniques

This file documents the key tricks and techniques used in each solution file. Use this as a quick reference to find which file contains a specific technique you're looking for.

## e_binary_gap.py
- **Technique**: Binary string manipulation
- **Key Trick**: Using `bin(N)[2:]` to convert number to binary string, then tracking gaps between 1s
- **Complexity**: O(log N) - linear in number of bits
- **Key Insight**: Track gaps between 1s while iterating through binary digits

## e_cyclic_rotation.py
- **Technique**: Array rotation
- **Key Trick**: Using modulo operation to handle circular rotation
- **Complexity**: O(N)
- **Key Insight**: New position = (current position + K) % array length

## e_frog_jump.py
- **Technique**: Mathematical calculation
- **Key Trick**: Using integer division to calculate minimum jumps
- **Complexity**: O(1)
- **Key Insight**: (Y - X) / D rounded up gives minimum jumps

## e_frog_river_jump.py
- **Technique**: Array tracking
- **Key Trick**: Using a boolean array to track covered positions
- **Complexity**: O(N)
- **Key Insight**: Track when all positions 1 to X are covered

## e_missing_elem.py
- **Technique**: Mathematical series
- **Key Trick**: Using sum of arithmetic series to find missing element
- **Complexity**: O(N)
- **Key Insight**: Sum of 1 to N+1 minus sum of array gives missing element

## e_perm_check.py
- **Technique**: Array validation
- **Key Trick**: Using boolean array to check for all numbers 1 to N
- **Complexity**: O(N)
- **Key Insight**: Track presence of all numbers 1 to N in array

## e_tape_equilibrium.py
- **Technique**: Prefix sums
- **Key Trick**: Using prefix sums to calculate splits efficiently
- **Complexity**: O(N)
- **Key Insight**: Calculate total sum first, then track running sum to find minimum difference

## e_unpair_element.py
- **Technique**: Bitwise operations
- **Key Trick**: Using XOR operation to find unpaired element
- **Complexity**: O(N)
- **Key Insight**: XOR of all elements cancels out pairs, leaving unpaired element

## m_max_counters.py
- **Technique**: Array operations
- **Key Trick**: Lazy update of counters to handle max counter operations efficiently
- **Complexity**: O(N + M)
- **Key Insight**: Track last max operation and apply it only when needed 