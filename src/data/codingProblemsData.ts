import { CodingProblem } from '../types';

export const CODING_PROBLEMS: CodingProblem[] = [
  {
    "id": "prob-1",
    "number": 1,
    "title": "Two Sum",
    "difficulty": "Easy",
    "acceptance": "58.1%",
    "category": "JavaScript",
    "tags": [
      "Array"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "solved",
    "frequency": 2,
    "description": "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
    "examples": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "output": "[0,1]",
        "explanation": "Because nums[0] + nums[1] == 9, we return [0, 1]."
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "output": "[1,2]"
      },
      {
        "input": "nums = [3,3], target = 6",
        "output": "[0,1]"
      }
    ],
    "constraints": [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) {\n            return [map.get(complement), i];\n        }\n        map.set(nums[i], i);\n    }\n    return [];\n};",
      "python": "class Solution:\n    def twoSum(self, nums: List[int], target: int) -> List[int]:\n        lookup = {}\n        for i, num in enumerate(nums):\n            comp = target - num\n            if comp in lookup:\n                return [lookup[comp], i]\n            lookup[num] = i\n        return []",
      "cpp": "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> m;\n        for (int i = 0; i < nums.size(); i++) {\n            if (m.count(target - nums[i])) return {m[target - nums[i]], i};\n            m[nums[i]] = i;\n        }\n        return {};\n    }\n};",
      "java": "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int comp = target - nums[i];\n            if (map.containsKey(comp)) return new int[] { map.get(comp), i };\n            map.put(nums[i], i);\n        }\n        return new int[0];\n    }\n}"
    },
    "testCases": [
      {
        "input": "nums = [2,7,11,15], target = 9",
        "expected": "[0,1]"
      },
      {
        "input": "nums = [3,2,4], target = 6",
        "expected": "[1,2]"
      }
    ]
  },
  {
    "id": "prob-2",
    "number": 2,
    "title": "Add Two Numbers",
    "difficulty": "Med.",
    "acceptance": "49.6%",
    "category": "JavaScript",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.",
    "examples": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "output": "[7,0,8]",
        "explanation": "342 + 465 = 807."
      },
      {
        "input": "l1 = [0], l2 = [0]",
        "output": "[0]"
      }
    ],
    "constraints": [
      "The number of nodes in each linked list is in the range [1, 100].",
      "0 <= Node.val <= 9"
    ],
    "starterCode": {
      "javascript": "var addTwoNumbers = function(l1, l2) {\n    let dummy = new ListNode(0);\n    let curr = dummy, carry = 0;\n    while (l1 !== null || l2 !== null || carry > 0) {\n        let sum = carry;\n        if (l1 !== null) { sum += l1.val; l1 = l1.next; }\n        if (l2 !== null) { sum += l2.val; l2 = l2.next; }\n        carry = Math.floor(sum / 10);\n        curr.next = new ListNode(sum % 10);\n        curr = curr.next;\n    }\n    return dummy.next;\n};",
      "python": "class Solution:\n    def addTwoNumbers(self, l1, l2):\n        dummy = ListNode(0)\n        curr = dummy\n        carry = 0\n        while l1 or l2 or carry:\n            total = carry + (l1.val if l1 else 0) + (l2.val if l2 else 0)\n            carry = total // 10\n            curr.next = ListNode(total % 10)\n            curr = curr.next\n            l1 = l1.next if l1 else None\n            l2 = l2.next if l2 else None\n        return dummy.next",
      "cpp": "class Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode dummy(0);\n        ListNode* curr = &dummy;\n        int carry = 0;\n        while (l1 || l2 || carry) {\n            int sum = carry + (l1 ? l1->val : 0) + (l2 ? l2->val : 0);\n            carry = sum / 10;\n            curr->next = new ListNode(sum % 10);\n            curr = curr->next;\n            l1 = l1 ? l1->next : nullptr;\n            l2 = l2 ? l2->next : nullptr;\n        }\n        return dummy.next;\n    }\n};",
      "java": "class Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode curr = dummy;\n        int carry = 0;\n        while (l1 != null || l2 != null || carry != 0) {\n            int sum = carry + (l1 != null ? l1.val : 0) + (l2 != null ? l2.val : 0);\n            carry = sum / 10;\n            curr.next = new ListNode(sum % 10);\n            curr = curr.next;\n            if (l1 != null) l1 = l1.next;\n            if (l2 != null) l2 = l2.next;\n        }\n        return dummy.next;\n    }\n}"
    },
    "testCases": [
      {
        "input": "l1 = [2,4,3], l2 = [5,6,4]",
        "expected": "[7,0,8]"
      },
      {
        "input": "l1 = [0], l2 = [0]",
        "expected": "[0]"
      }
    ]
  },
  {
    "id": "prob-3",
    "number": 3,
    "title": "Longest Substring Without Repeating Characters",
    "difficulty": "Med.",
    "acceptance": "40.1%",
    "category": "JavaScript",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "String"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "attempted",
    "frequency": 4,
    "description": "Given a string s, find the length of the longest substring without duplicate characters.",
    "examples": [
      {
        "input": "s = \"abcabcbb\"",
        "output": "3",
        "explanation": "The answer is \"abc\", with the length of 3."
      },
      {
        "input": "s = \"bbbbb\"",
        "output": "1",
        "explanation": "The answer is \"b\", with the length of 1."
      }
    ],
    "constraints": [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces."
    ],
    "starterCode": {
      "javascript": "var lengthOfLongestSubstring = function(s) {\n    let map = new Map();\n    let maxLen = 0, left = 0;\n    for (let right = 0; right < s.length; right++) {\n        if (map.has(s[right])) {\n            left = Math.max(left, map.get(s[right]) + 1);\n        }\n        map.set(s[right], right);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n};",
      "python": "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        seen = {}\n        max_len = left = 0\n        for right, ch in enumerate(s):\n            if ch in seen and seen[ch] >= left:\n                left = seen[ch] + 1\n            seen[ch] = right\n            max_len = max(max_len, right - left + 1)\n        return max_len",
      "cpp": "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        vector<int> dict(256, -1);\n        int maxLen = 0, start = -1;\n        for (int i = 0; i < s.length(); i++) {\n            if (dict[s[i]] > start) start = dict[s[i]];\n            dict[s[i]] = i;\n            maxLen = max(maxLen, i - start);\n        }\n        return maxLen;\n    }\n};",
      "java": "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Map<Character, Integer> map = new HashMap<>();\n        int max = 0, left = 0;\n        for (int right = 0; right < s.length(); right++) {\n            char c = s.charAt(right);\n            if (map.containsKey(c)) {\n                left = Math.max(left, map.get(c) + 1);\n            }\n            map.put(c, right);\n            max = Math.max(max, right - left + 1);\n        }\n        return max;\n    }\n}"
    },
    "testCases": [
      {
        "input": "s = \"abcabcbb\"",
        "expected": "3"
      },
      {
        "input": "s = \"bbbbb\"",
        "expected": "1"
      }
    ]
  },
  {
    "id": "prob-4",
    "number": 4,
    "title": "Median of Two Sorted Arrays",
    "difficulty": "Hard",
    "acceptance": "48.0%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Median of Two Sorted Arrays, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #4 - Median of Two Sorted Arrays.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Median of Two Sorted Arrays."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar medianOfTwoSortedArrays = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def medianOfTwoSortedArrays(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void medianOfTwoSortedArrays() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void medianOfTwoSortedArrays() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-5",
    "number": 5,
    "title": "Longest Palindromic Substring",
    "difficulty": "Med.",
    "acceptance": "38.9%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "String"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Longest Palindromic Substring, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #5 - Longest Palindromic Substring.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Longest Palindromic Substring."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar longestPalindromicSubstring = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def longestPalindromicSubstring(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void longestPalindromicSubstring() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void longestPalindromicSubstring() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-6",
    "number": 6,
    "title": "Zigzag Conversion",
    "difficulty": "Med.",
    "acceptance": "55.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Zigzag Conversion, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #6 - Zigzag Conversion.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Zigzag Conversion."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar zigzagConversion = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def zigzagConversion(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void zigzagConversion() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void zigzagConversion() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-7",
    "number": 7,
    "title": "Reverse Integer",
    "difficulty": "Med.",
    "acceptance": "32.8%",
    "category": "Algorithms",
    "tags": [
      "Math"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Reverse Integer, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #7 - Reverse Integer.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Integer."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseInteger = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseInteger(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseInteger() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseInteger() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-8",
    "number": 8,
    "title": "String to Integer (atoi)",
    "difficulty": "Med.",
    "acceptance": "22.0%",
    "category": "Algorithms",
    "tags": [
      "String",
      "Math"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for String to Integer (atoi), implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #8 - String to Integer (atoi).\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for String to Integer (atoi)."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar stringToIntegerAtoi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def stringToIntegerAtoi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void stringToIntegerAtoi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void stringToIntegerAtoi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-9",
    "number": 9,
    "title": "Palindrome Number",
    "difficulty": "Easy",
    "acceptance": "61.1%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Palindrome Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #9 - Palindrome Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Palindrome Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar palindromeNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def palindromeNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void palindromeNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void palindromeNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-10",
    "number": 10,
    "title": "Regular Expression Matching",
    "difficulty": "Hard",
    "acceptance": "32.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Regular Expression Matching, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #10 - Regular Expression Matching.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Regular Expression Matching."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar regularExpressionMatching = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def regularExpressionMatching(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void regularExpressionMatching() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void regularExpressionMatching() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-11",
    "number": 11,
    "title": "Container With Most Water",
    "difficulty": "Med.",
    "acceptance": "61.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Container With Most Water, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #11 - Container With Most Water.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Container With Most Water."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar containerWithMostWater = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def containerWithMostWater(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void containerWithMostWater() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void containerWithMostWater() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-12",
    "number": 12,
    "title": "Integer to Roman",
    "difficulty": "Med.",
    "acceptance": "71.9%",
    "category": "Algorithms",
    "tags": [
      "Math"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Integer to Roman, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #12 - Integer to Roman.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Integer to Roman."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar integerToRoman = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def integerToRoman(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void integerToRoman() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void integerToRoman() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-13",
    "number": 13,
    "title": "Roman to Integer",
    "difficulty": "Easy",
    "acceptance": "67.4%",
    "category": "Algorithms",
    "tags": [
      "Math"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Roman to Integer, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #13 - Roman to Integer.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Roman to Integer."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar romanToInteger = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def romanToInteger(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void romanToInteger() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void romanToInteger() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-14",
    "number": 14,
    "title": "Longest Common Prefix",
    "difficulty": "Easy",
    "acceptance": "48.6%",
    "category": "JavaScript",
    "tags": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Longest Common Prefix, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #14 - Longest Common Prefix.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Longest Common Prefix."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar longestCommonPrefix = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def longestCommonPrefix(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void longestCommonPrefix() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void longestCommonPrefix() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-15",
    "number": 15,
    "title": "3Sum",
    "difficulty": "Med.",
    "acceptance": "40.1%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for 3Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #15 - 3Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for 3Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar 3sum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def 3sum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void 3sum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void 3sum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-16",
    "number": 16,
    "title": "3Sum Closest",
    "difficulty": "Med.",
    "acceptance": "47.8%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for 3Sum Closest, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #16 - 3Sum Closest.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for 3Sum Closest."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar 3sumClosest = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def 3sumClosest(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void 3sumClosest() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void 3sumClosest() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-17",
    "number": 17,
    "title": "Letter Combinations of a Phone Number",
    "difficulty": "Med.",
    "acceptance": "67.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Letter Combinations of a Phone Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #17 - Letter Combinations of a Phone Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Letter Combinations of a Phone Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar letterCombinationsOfAPhoneNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def letterCombinationsOfAPhoneNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void letterCombinationsOfAPhoneNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void letterCombinationsOfAPhoneNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-18",
    "number": 18,
    "title": "4Sum",
    "difficulty": "Med.",
    "acceptance": "42.1%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for 4Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #18 - 4Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for 4Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar 4sum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def 4sum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void 4sum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void 4sum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-19",
    "number": 19,
    "title": "Remove Nth Node From End of List",
    "difficulty": "Med.",
    "acceptance": "53.0%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Remove Nth Node From End of List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #19 - Remove Nth Node From End of List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Nth Node From End of List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeNthNodeFromEndOfList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeNthNodeFromEndOfList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeNthNodeFromEndOfList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeNthNodeFromEndOfList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-20",
    "number": 20,
    "title": "Valid Parentheses",
    "difficulty": "Easy",
    "acceptance": "45.4%",
    "category": "JavaScript",
    "tags": [
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "solved",
    "frequency": 1,
    "description": "Given the input parameters for Valid Parentheses, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #20 - Valid Parentheses.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Valid Parentheses."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar validParentheses = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def validParentheses(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validParentheses() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validParentheses() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-21",
    "number": 21,
    "title": "Merge Two Sorted Lists",
    "difficulty": "Easy",
    "acceptance": "69.1%",
    "category": "JavaScript",
    "tags": [
      "Linked List",
      "Array"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Merge Two Sorted Lists, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #21 - Merge Two Sorted Lists.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Merge Two Sorted Lists."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar mergeTwoSortedLists = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def mergeTwoSortedLists(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void mergeTwoSortedLists() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void mergeTwoSortedLists() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-22",
    "number": 22,
    "title": "Generate Parentheses",
    "difficulty": "Med.",
    "acceptance": "79.8%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Generate Parentheses, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #22 - Generate Parentheses.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Generate Parentheses."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar generateParentheses = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def generateParentheses(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void generateParentheses() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void generateParentheses() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-23",
    "number": 23,
    "title": "Merge k Sorted Lists",
    "difficulty": "Hard",
    "acceptance": "60.9%",
    "category": "Algorithms",
    "tags": [
      "Linked List",
      "Array"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Merge k Sorted Lists, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #23 - Merge k Sorted Lists.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Merge k Sorted Lists."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar mergeKSortedLists = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def mergeKSortedLists(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void mergeKSortedLists() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void mergeKSortedLists() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-24",
    "number": 24,
    "title": "Swap Nodes in Pairs",
    "difficulty": "Med.",
    "acceptance": "70.5%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Swap Nodes in Pairs, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #24 - Swap Nodes in Pairs.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Swap Nodes in Pairs."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar swapNodesInPairs = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def swapNodesInPairs(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void swapNodesInPairs() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void swapNodesInPairs() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-25",
    "number": 25,
    "title": "Reverse Nodes in k-Group",
    "difficulty": "Hard",
    "acceptance": "67.6%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Reverse Nodes in k-Group, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #25 - Reverse Nodes in k-Group.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Nodes in k-Group."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseNodesInKgroup = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseNodesInKgroup(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseNodesInKgroup() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseNodesInKgroup() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-26",
    "number": 26,
    "title": "Remove Duplicates from Sorted Array",
    "difficulty": "Easy",
    "acceptance": "64.0%",
    "category": "JavaScript",
    "tags": [
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Remove Duplicates from Sorted Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #26 - Remove Duplicates from Sorted Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Duplicates from Sorted Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeDuplicatesFromSortedArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeDuplicatesFromSortedArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeDuplicatesFromSortedArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeDuplicatesFromSortedArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-27",
    "number": 27,
    "title": "Remove Element",
    "difficulty": "Easy",
    "acceptance": "62.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Remove Element, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #27 - Remove Element.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Element."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeElement = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeElement(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeElement() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeElement() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-28",
    "number": 28,
    "title": "Find the Index of the First Occurrence in a String",
    "difficulty": "Easy",
    "acceptance": "47.5%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Find the Index of the First Occurrence in a String, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #28 - Find the Index of the First Occurrence in a String.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Find the Index of the First Occurrence in a String."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar findTheIndexOfTheFirstOccurrenceInAString = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def findTheIndexOfTheFirstOccurrenceInAString(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void findTheIndexOfTheFirstOccurrenceInAString() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void findTheIndexOfTheFirstOccurrenceInAString() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-29",
    "number": 29,
    "title": "Divide Two Integers",
    "difficulty": "Med.",
    "acceptance": "20.5%",
    "category": "Algorithms",
    "tags": [
      "Math"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Divide Two Integers, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #29 - Divide Two Integers.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Divide Two Integers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar divideTwoIntegers = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def divideTwoIntegers(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void divideTwoIntegers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void divideTwoIntegers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-30",
    "number": 30,
    "title": "Substring with Concatenation of All Words",
    "difficulty": "Hard",
    "acceptance": "35.6%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "String"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Substring with Concatenation of All Words, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #30 - Substring with Concatenation of All Words.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Substring with Concatenation of All Words."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar substringWithConcatenationOfAllWords = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def substringWithConcatenationOfAllWords(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void substringWithConcatenationOfAllWords() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void substringWithConcatenationOfAllWords() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-31",
    "number": 31,
    "title": "Next Permutation",
    "difficulty": "Med.",
    "acceptance": "46.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Next Permutation, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #31 - Next Permutation.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Next Permutation."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar nextPermutation = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def nextPermutation(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void nextPermutation() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void nextPermutation() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-32",
    "number": 32,
    "title": "Longest Valid Parentheses",
    "difficulty": "Hard",
    "acceptance": "41.5%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Longest Valid Parentheses, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #32 - Longest Valid Parentheses.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Longest Valid Parentheses."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar longestValidParentheses = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def longestValidParentheses(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void longestValidParentheses() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void longestValidParentheses() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-33",
    "number": 33,
    "title": "Search in Rotated Sorted Array",
    "difficulty": "Med.",
    "acceptance": "45.9%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Search in Rotated Sorted Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #33 - Search in Rotated Sorted Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Search in Rotated Sorted Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar searchInRotatedSortedArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def searchInRotatedSortedArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void searchInRotatedSortedArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void searchInRotatedSortedArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-34",
    "number": 34,
    "title": "Find First and Last Position of Element in Sorted Array",
    "difficulty": "Med.",
    "acceptance": "49.9%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Find First and Last Position of Element in Sorted Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #34 - Find First and Last Position of Element in Sorted Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Find First and Last Position of Element in Sorted Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar findFirstAndLastPositionOfElementInSortedArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def findFirstAndLastPositionOfElementInSortedArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void findFirstAndLastPositionOfElementInSortedArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void findFirstAndLastPositionOfElementInSortedArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-35",
    "number": 35,
    "title": "Search Insert Position",
    "difficulty": "Easy",
    "acceptance": "52.6%",
    "category": "Algorithms",
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Search Insert Position, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #35 - Search Insert Position.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Search Insert Position."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar searchInsertPosition = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def searchInsertPosition(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void searchInsertPosition() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void searchInsertPosition() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-36",
    "number": 36,
    "title": "Valid Sudoku",
    "difficulty": "Med.",
    "acceptance": "65.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Valid Sudoku, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #36 - Valid Sudoku.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Valid Sudoku."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar validSudoku = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def validSudoku(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validSudoku() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validSudoku() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-37",
    "number": 37,
    "title": "Sudoku Solver",
    "difficulty": "Hard",
    "acceptance": "65.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Sudoku Solver, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #37 - Sudoku Solver.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Sudoku Solver."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sudokuSolver = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sudokuSolver(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sudokuSolver() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sudokuSolver() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-38",
    "number": 38,
    "title": "Count and Say",
    "difficulty": "Med.",
    "acceptance": "64.2%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Count and Say, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #38 - Count and Say.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Count and Say."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar countAndSay = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def countAndSay(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void countAndSay() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void countAndSay() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-39",
    "number": 39,
    "title": "Combination Sum",
    "difficulty": "Med.",
    "acceptance": "77.3%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Combination Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #39 - Combination Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Combination Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar combinationSum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def combinationSum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void combinationSum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void combinationSum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-40",
    "number": 40,
    "title": "Combination Sum II",
    "difficulty": "Med.",
    "acceptance": "60.4%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Combination Sum II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #40 - Combination Sum II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Combination Sum II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar combinationSumIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def combinationSumIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void combinationSumIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void combinationSumIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-41",
    "number": 41,
    "title": "First Missing Positive",
    "difficulty": "Hard",
    "acceptance": "44.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for First Missing Positive, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #41 - First Missing Positive.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for First Missing Positive."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar firstMissingPositive = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def firstMissingPositive(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void firstMissingPositive() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void firstMissingPositive() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-42",
    "number": 42,
    "title": "Trapping Rain Water",
    "difficulty": "Hard",
    "acceptance": "68.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Trapping Rain Water, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #42 - Trapping Rain Water.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Trapping Rain Water."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar trappingRainWater = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def trappingRainWater(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void trappingRainWater() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void trappingRainWater() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-43",
    "number": 43,
    "title": "Multiply Strings",
    "difficulty": "Med.",
    "acceptance": "44.9%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Multiply Strings, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #43 - Multiply Strings.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Multiply Strings."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar multiplyStrings = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def multiplyStrings(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void multiplyStrings() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void multiplyStrings() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-44",
    "number": 44,
    "title": "Wildcard Matching",
    "difficulty": "Hard",
    "acceptance": "33.2%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Wildcard Matching, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #44 - Wildcard Matching.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Wildcard Matching."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wildcardMatching = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wildcardMatching(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wildcardMatching() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wildcardMatching() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-45",
    "number": 45,
    "title": "Jump Game II",
    "difficulty": "Med.",
    "acceptance": "43.7%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Jump Game II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #45 - Jump Game II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Jump Game II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar jumpGameIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def jumpGameIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void jumpGameIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void jumpGameIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-46",
    "number": 46,
    "title": "Permutations",
    "difficulty": "Med.",
    "acceptance": "82.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Permutations, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #46 - Permutations.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Permutations."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar permutations = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def permutations(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void permutations() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void permutations() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-47",
    "number": 47,
    "title": "Permutations II",
    "difficulty": "Med.",
    "acceptance": "64.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Permutations II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #47 - Permutations II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Permutations II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar permutationsIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def permutationsIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void permutationsIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void permutationsIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-48",
    "number": 48,
    "title": "Rotate Image",
    "difficulty": "Med.",
    "acceptance": "80.9%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Rotate Image, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #48 - Rotate Image.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Rotate Image."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar rotateImage = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def rotateImage(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void rotateImage() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void rotateImage() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-49",
    "number": 49,
    "title": "Group Anagrams",
    "difficulty": "Med.",
    "acceptance": "73.5%",
    "category": "JavaScript",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Group Anagrams, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #49 - Group Anagrams.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Group Anagrams."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar groupAnagrams = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def groupAnagrams(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void groupAnagrams() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void groupAnagrams() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-50",
    "number": 50,
    "title": "Pow(x, n)",
    "difficulty": "Med.",
    "acceptance": "39.2%",
    "category": "Algorithms",
    "tags": [
      "Math"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Pow(x, n), implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #50 - Pow(x, n).\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Pow(x, n)."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar powxN = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def powxN(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void powxN() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void powxN() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-51",
    "number": 51,
    "title": "N-Queens",
    "difficulty": "Hard",
    "acceptance": "76.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for N-Queens, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #51 - N-Queens.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for N-Queens."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar nqueens = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def nqueens(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void nqueens() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void nqueens() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-52",
    "number": 52,
    "title": "N-Queens II",
    "difficulty": "Hard",
    "acceptance": "79.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for N-Queens II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #52 - N-Queens II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for N-Queens II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar nqueensIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def nqueensIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void nqueensIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void nqueensIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-53",
    "number": 53,
    "title": "Maximum Subarray",
    "difficulty": "Med.",
    "acceptance": "54.0%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "attempted",
    "frequency": 4,
    "description": "Given the input parameters for Maximum Subarray, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #53 - Maximum Subarray.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Maximum Subarray."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maximumSubarray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maximumSubarray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maximumSubarray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maximumSubarray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-54",
    "number": 54,
    "title": "Spiral Matrix",
    "difficulty": "Med.",
    "acceptance": "58.3%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Spiral Matrix, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #54 - Spiral Matrix.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Spiral Matrix."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar spiralMatrix = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def spiralMatrix(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void spiralMatrix() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void spiralMatrix() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-55",
    "number": 55,
    "title": "Jump Game",
    "difficulty": "Med.",
    "acceptance": "41.7%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Jump Game, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #55 - Jump Game.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Jump Game."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar jumpGame = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def jumpGame(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void jumpGame() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void jumpGame() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-56",
    "number": 56,
    "title": "Merge Intervals",
    "difficulty": "Med.",
    "acceptance": "53.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Merge Intervals, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #56 - Merge Intervals.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Merge Intervals."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar mergeIntervals = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def mergeIntervals(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void mergeIntervals() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void mergeIntervals() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-57",
    "number": 57,
    "title": "Insert Interval",
    "difficulty": "Med.",
    "acceptance": "46.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Insert Interval, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #57 - Insert Interval.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Insert Interval."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar insertInterval = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def insertInterval(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void insertInterval() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void insertInterval() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-58",
    "number": 58,
    "title": "Length of Last Word",
    "difficulty": "Easy",
    "acceptance": "60.0%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Length of Last Word, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #58 - Length of Last Word.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Length of Last Word."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar lengthOfLastWord = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def lengthOfLastWord(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void lengthOfLastWord() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void lengthOfLastWord() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-59",
    "number": 59,
    "title": "Spiral Matrix II",
    "difficulty": "Med.",
    "acceptance": "76.1%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Spiral Matrix II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #59 - Spiral Matrix II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Spiral Matrix II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar spiralMatrixIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def spiralMatrixIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void spiralMatrixIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void spiralMatrixIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-60",
    "number": 60,
    "title": "Permutation Sequence",
    "difficulty": "Hard",
    "acceptance": "54.8%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Permutation Sequence, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #60 - Permutation Sequence.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Permutation Sequence."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar permutationSequence = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def permutationSequence(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void permutationSequence() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void permutationSequence() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-61",
    "number": 61,
    "title": "Rotate List",
    "difficulty": "Med.",
    "acceptance": "43.6%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Rotate List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #61 - Rotate List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Rotate List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar rotateList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def rotateList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void rotateList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void rotateList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-62",
    "number": 62,
    "title": "Unique Paths",
    "difficulty": "Med.",
    "acceptance": "67.4%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Unique Paths, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #62 - Unique Paths.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Unique Paths."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar uniquePaths = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def uniquePaths(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void uniquePaths() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void uniquePaths() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-63",
    "number": 63,
    "title": "Unique Paths II",
    "difficulty": "Med.",
    "acceptance": "45.3%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Unique Paths II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #63 - Unique Paths II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Unique Paths II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar uniquePathsIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def uniquePathsIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void uniquePathsIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void uniquePathsIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-64",
    "number": 64,
    "title": "Minimum Path Sum",
    "difficulty": "Med.",
    "acceptance": "69.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Minimum Path Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #64 - Minimum Path Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Minimum Path Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar minimumPathSum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def minimumPathSum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void minimumPathSum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void minimumPathSum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-65",
    "number": 65,
    "title": "Valid Number",
    "difficulty": "Hard",
    "acceptance": "23.9%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Valid Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #65 - Valid Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Valid Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar validNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def validNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-66",
    "number": 66,
    "title": "Plus One",
    "difficulty": "Easy",
    "acceptance": "50.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Plus One, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #66 - Plus One.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Plus One."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar plusOne = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def plusOne(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void plusOne() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void plusOne() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-67",
    "number": 67,
    "title": "Add Binary",
    "difficulty": "Easy",
    "acceptance": "58.9%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Add Binary, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #67 - Add Binary.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Add Binary."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar addBinary = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def addBinary(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void addBinary() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void addBinary() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-68",
    "number": 68,
    "title": "Text Justification",
    "difficulty": "Hard",
    "acceptance": "52.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Text Justification, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #68 - Text Justification.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Text Justification."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar textJustification = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def textJustification(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void textJustification() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void textJustification() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-69",
    "number": 69,
    "title": "Sqrt(x)",
    "difficulty": "Easy",
    "acceptance": "42.4%",
    "category": "Algorithms",
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Sqrt(x), implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #69 - Sqrt(x).\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Sqrt(x)."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sqrtx = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sqrtx(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sqrtx() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sqrtx() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-70",
    "number": 70,
    "title": "Climbing Stairs",
    "difficulty": "Easy",
    "acceptance": "54.4%",
    "category": "JavaScript",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "solved",
    "frequency": 1,
    "description": "Given the input parameters for Climbing Stairs, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #70 - Climbing Stairs.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Climbing Stairs."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar climbingStairs = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def climbingStairs(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void climbingStairs() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void climbingStairs() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-71",
    "number": 71,
    "title": "Simplify Path",
    "difficulty": "Med.",
    "acceptance": "51.8%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Simplify Path, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #71 - Simplify Path.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Simplify Path."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar simplifyPath = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def simplifyPath(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void simplifyPath() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void simplifyPath() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-72",
    "number": 72,
    "title": "Edit Distance",
    "difficulty": "Med.",
    "acceptance": "61.5%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Edit Distance, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #72 - Edit Distance.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Edit Distance."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar editDistance = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def editDistance(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void editDistance() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void editDistance() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-73",
    "number": 73,
    "title": "Set Matrix Zeroes",
    "difficulty": "Med.",
    "acceptance": "63.9%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Set Matrix Zeroes, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #73 - Set Matrix Zeroes.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Set Matrix Zeroes."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar setMatrixZeroes = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def setMatrixZeroes(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void setMatrixZeroes() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void setMatrixZeroes() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-74",
    "number": 74,
    "title": "Search a 2D Matrix",
    "difficulty": "Med.",
    "acceptance": "54.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Search a 2D Matrix, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #74 - Search a 2D Matrix.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Search a 2D Matrix."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar searchA2dMatrix = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def searchA2dMatrix(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void searchA2dMatrix() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void searchA2dMatrix() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-75",
    "number": 75,
    "title": "Sort Colors",
    "difficulty": "Med.",
    "acceptance": "70.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Sort Colors, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #75 - Sort Colors.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Sort Colors."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sortColors = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sortColors(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sortColors() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sortColors() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-76",
    "number": 76,
    "title": "Minimum Window Substring",
    "difficulty": "Hard",
    "acceptance": "48.8%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Minimum Window Substring, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #76 - Minimum Window Substring.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Minimum Window Substring."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar minimumWindowSubstring = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def minimumWindowSubstring(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void minimumWindowSubstring() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void minimumWindowSubstring() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-77",
    "number": 77,
    "title": "Combinations",
    "difficulty": "Med.",
    "acceptance": "75.4%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Combinations, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #77 - Combinations.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Combinations."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar combinations = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def combinations(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void combinations() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void combinations() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-78",
    "number": 78,
    "title": "Subsets",
    "difficulty": "Med.",
    "acceptance": "83.0%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Subsets, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #78 - Subsets.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Subsets."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar subsets = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def subsets(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void subsets() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void subsets() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-79",
    "number": 79,
    "title": "Word Search",
    "difficulty": "Med.",
    "acceptance": "48.4%",
    "category": "Algorithms",
    "tags": [
      "String",
      "Binary Search"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Word Search, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #79 - Word Search.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Search."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wordSearch = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wordSearch(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordSearch() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordSearch() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-80",
    "number": 80,
    "title": "Remove Duplicates from Sorted Array II",
    "difficulty": "Med.",
    "acceptance": "65.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Remove Duplicates from Sorted Array II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #80 - Remove Duplicates from Sorted Array II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Duplicates from Sorted Array II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeDuplicatesFromSortedArrayIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeDuplicatesFromSortedArrayIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeDuplicatesFromSortedArrayIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeDuplicatesFromSortedArrayIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-81",
    "number": 81,
    "title": "Search in Rotated Sorted Array II",
    "difficulty": "Med.",
    "acceptance": "40.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Search in Rotated Sorted Array II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #81 - Search in Rotated Sorted Array II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Search in Rotated Sorted Array II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar searchInRotatedSortedArrayIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def searchInRotatedSortedArrayIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void searchInRotatedSortedArrayIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void searchInRotatedSortedArrayIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-82",
    "number": 82,
    "title": "Remove Duplicates from Sorted List II",
    "difficulty": "Med.",
    "acceptance": "52.8%",
    "category": "Algorithms",
    "tags": [
      "Linked List",
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Remove Duplicates from Sorted List II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #82 - Remove Duplicates from Sorted List II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Duplicates from Sorted List II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeDuplicatesFromSortedListIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeDuplicatesFromSortedListIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeDuplicatesFromSortedListIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeDuplicatesFromSortedListIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-83",
    "number": 83,
    "title": "Remove Duplicates from Sorted List",
    "difficulty": "Easy",
    "acceptance": "57.8%",
    "category": "Algorithms",
    "tags": [
      "Linked List",
      "Array"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Remove Duplicates from Sorted List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #83 - Remove Duplicates from Sorted List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Remove Duplicates from Sorted List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar removeDuplicatesFromSortedList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def removeDuplicatesFromSortedList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void removeDuplicatesFromSortedList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void removeDuplicatesFromSortedList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-84",
    "number": 84,
    "title": "Largest Rectangle in Histogram",
    "difficulty": "Hard",
    "acceptance": "51.2%",
    "category": "Algorithms",
    "tags": [
      "Stack"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Largest Rectangle in Histogram, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #84 - Largest Rectangle in Histogram.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Largest Rectangle in Histogram."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar largestRectangleInHistogram = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def largestRectangleInHistogram(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void largestRectangleInHistogram() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void largestRectangleInHistogram() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-85",
    "number": 85,
    "title": "Maximal Rectangle",
    "difficulty": "Hard",
    "acceptance": "60.2%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Maximal Rectangle, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #85 - Maximal Rectangle.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Maximal Rectangle."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maximalRectangle = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maximalRectangle(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maximalRectangle() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maximalRectangle() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-86",
    "number": 86,
    "title": "Partition List",
    "difficulty": "Med.",
    "acceptance": "62.5%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Partition List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #86 - Partition List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Partition List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar partitionList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def partitionList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void partitionList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void partitionList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-87",
    "number": 87,
    "title": "Scramble String",
    "difficulty": "Hard",
    "acceptance": "46.0%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Scramble String, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #87 - Scramble String.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Scramble String."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar scrambleString = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def scrambleString(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void scrambleString() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void scrambleString() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-88",
    "number": 88,
    "title": "Merge Sorted Array",
    "difficulty": "Easy",
    "acceptance": "56.0%",
    "category": "JavaScript",
    "tags": [
      "Array"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Merge Sorted Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #88 - Merge Sorted Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Merge Sorted Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar mergeSortedArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def mergeSortedArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void mergeSortedArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void mergeSortedArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-89",
    "number": 89,
    "title": "Gray Code",
    "difficulty": "Med.",
    "acceptance": "66.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Gray Code, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #89 - Gray Code.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Gray Code."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar grayCode = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def grayCode(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void grayCode() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void grayCode() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-90",
    "number": 90,
    "title": "Subsets II",
    "difficulty": "Med.",
    "acceptance": "62.2%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Subsets II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #90 - Subsets II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Subsets II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar subsetsIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def subsetsIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void subsetsIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void subsetsIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-91",
    "number": 91,
    "title": "Decode Ways",
    "difficulty": "Med.",
    "acceptance": "38.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Decode Ways, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #91 - Decode Ways.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Decode Ways."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar decodeWays = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def decodeWays(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void decodeWays() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void decodeWays() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-92",
    "number": 92,
    "title": "Reverse Linked List II",
    "difficulty": "Med.",
    "acceptance": "52.7%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Reverse Linked List II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #92 - Reverse Linked List II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Linked List II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseLinkedListIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseLinkedListIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseLinkedListIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseLinkedListIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-93",
    "number": 93,
    "title": "Restore IP Addresses",
    "difficulty": "Med.",
    "acceptance": "57.5%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Restore IP Addresses, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #93 - Restore IP Addresses.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Restore IP Addresses."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar restoreIpAddresses = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def restoreIpAddresses(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void restoreIpAddresses() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void restoreIpAddresses() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-94",
    "number": 94,
    "title": "Binary Tree Inorder Traversal",
    "difficulty": "Easy",
    "acceptance": "80.8%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Binary Tree Inorder Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #94 - Binary Tree Inorder Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Inorder Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeInorderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeInorderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeInorderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeInorderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-95",
    "number": 95,
    "title": "Unique Binary Search Trees II",
    "difficulty": "Med.",
    "acceptance": "63.7%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Unique Binary Search Trees II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #95 - Unique Binary Search Trees II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Unique Binary Search Trees II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar uniqueBinarySearchTreesIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def uniqueBinarySearchTreesIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void uniqueBinarySearchTreesIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void uniqueBinarySearchTreesIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-96",
    "number": 96,
    "title": "Unique Binary Search Trees",
    "difficulty": "Med.",
    "acceptance": "64.4%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Binary Search"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Unique Binary Search Trees, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #96 - Unique Binary Search Trees.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Unique Binary Search Trees."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar uniqueBinarySearchTrees = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def uniqueBinarySearchTrees(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void uniqueBinarySearchTrees() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void uniqueBinarySearchTrees() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-97",
    "number": 97,
    "title": "Interleaving String",
    "difficulty": "Med.",
    "acceptance": "45.1%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Interleaving String, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #97 - Interleaving String.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Interleaving String."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar interleavingString = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def interleavingString(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void interleavingString() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void interleavingString() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-98",
    "number": 98,
    "title": "Validate Binary Search Tree",
    "difficulty": "Med.",
    "acceptance": "36.6%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Binary Search"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Validate Binary Search Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #98 - Validate Binary Search Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Validate Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar validateBinarySearchTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def validateBinarySearchTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validateBinarySearchTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validateBinarySearchTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-99",
    "number": 99,
    "title": "Recover Binary Search Tree",
    "difficulty": "Med.",
    "acceptance": "61.4%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Binary Search"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Recover Binary Search Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #99 - Recover Binary Search Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Recover Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar recoverBinarySearchTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def recoverBinarySearchTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void recoverBinarySearchTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void recoverBinarySearchTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-100",
    "number": 100,
    "title": "Same Tree",
    "difficulty": "Easy",
    "acceptance": "68.3%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Same Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #100 - Same Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Same Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sameTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sameTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sameTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sameTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-101",
    "number": 101,
    "title": "Symmetric Tree",
    "difficulty": "Easy",
    "acceptance": "62.3%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Symmetric Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #101 - Symmetric Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Symmetric Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar symmetricTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def symmetricTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void symmetricTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void symmetricTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-102",
    "number": 102,
    "title": "Binary Tree Level Order Traversal",
    "difficulty": "Med.",
    "acceptance": "73.7%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Binary Tree Level Order Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #102 - Binary Tree Level Order Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Level Order Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeLevelOrderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeLevelOrderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeLevelOrderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeLevelOrderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-103",
    "number": 103,
    "title": "Binary Tree Zigzag Level Order Traversal",
    "difficulty": "Med.",
    "acceptance": "64.7%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Binary Tree Zigzag Level Order Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #103 - Binary Tree Zigzag Level Order Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Zigzag Level Order Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeZigzagLevelOrderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeZigzagLevelOrderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeZigzagLevelOrderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeZigzagLevelOrderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-104",
    "number": 104,
    "title": "Maximum Depth of Binary Tree",
    "difficulty": "Easy",
    "acceptance": "78.8%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Maximum Depth of Binary Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #104 - Maximum Depth of Binary Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Maximum Depth of Binary Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maximumDepthOfBinaryTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maximumDepthOfBinaryTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maximumDepthOfBinaryTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maximumDepthOfBinaryTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-105",
    "number": 105,
    "title": "Construct Binary Tree from Preorder and Inorder Traversal",
    "difficulty": "Med.",
    "acceptance": "69.8%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Construct Binary Tree from Preorder and Inorder Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #105 - Construct Binary Tree from Preorder and Inorder Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Construct Binary Tree from Preorder and Inorder Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar constructBinaryTreeFromPreorderAndInorderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def constructBinaryTreeFromPreorderAndInorderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void constructBinaryTreeFromPreorderAndInorderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void constructBinaryTreeFromPreorderAndInorderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-106",
    "number": 106,
    "title": "Construct Binary Tree from Inorder and Postorder Traversal",
    "difficulty": "Med.",
    "acceptance": "69.9%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Construct Binary Tree from Inorder and Postorder Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #106 - Construct Binary Tree from Inorder and Postorder Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Construct Binary Tree from Inorder and Postorder Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar constructBinaryTreeFromInorderAndPostorderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def constructBinaryTreeFromInorderAndPostorderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void constructBinaryTreeFromInorderAndPostorderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void constructBinaryTreeFromInorderAndPostorderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-107",
    "number": 107,
    "title": "Binary Tree Level Order Traversal II",
    "difficulty": "Med.",
    "acceptance": "69.4%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Binary Tree Level Order Traversal II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #107 - Binary Tree Level Order Traversal II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Level Order Traversal II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeLevelOrderTraversalIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeLevelOrderTraversalIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeLevelOrderTraversalIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeLevelOrderTraversalIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-108",
    "number": 108,
    "title": "Convert Sorted Array to Binary Search Tree",
    "difficulty": "Easy",
    "acceptance": "76.3%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Convert Sorted Array to Binary Search Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #108 - Convert Sorted Array to Binary Search Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Convert Sorted Array to Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar convertSortedArrayToBinarySearchTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def convertSortedArrayToBinarySearchTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void convertSortedArrayToBinarySearchTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void convertSortedArrayToBinarySearchTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-109",
    "number": 109,
    "title": "Convert Sorted List to Binary Search Tree",
    "difficulty": "Med.",
    "acceptance": "67.7%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Linked List",
      "Array",
      "Binary Search"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Convert Sorted List to Binary Search Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #109 - Convert Sorted List to Binary Search Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Convert Sorted List to Binary Search Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar convertSortedListToBinarySearchTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def convertSortedListToBinarySearchTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void convertSortedListToBinarySearchTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void convertSortedListToBinarySearchTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-110",
    "number": 110,
    "title": "Balanced Binary Tree",
    "difficulty": "Easy",
    "acceptance": "59.5%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Balanced Binary Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #110 - Balanced Binary Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Balanced Binary Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar balancedBinaryTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def balancedBinaryTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void balancedBinaryTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void balancedBinaryTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-111",
    "number": 111,
    "title": "Minimum Depth of Binary Tree",
    "difficulty": "Easy",
    "acceptance": "54.1%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Minimum Depth of Binary Tree, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #111 - Minimum Depth of Binary Tree.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Minimum Depth of Binary Tree."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar minimumDepthOfBinaryTree = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def minimumDepthOfBinaryTree(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void minimumDepthOfBinaryTree() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void minimumDepthOfBinaryTree() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-112",
    "number": 112,
    "title": "Path Sum",
    "difficulty": "Easy",
    "acceptance": "56.0%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Path Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #112 - Path Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Path Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar pathSum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def pathSum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void pathSum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void pathSum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-113",
    "number": 113,
    "title": "Path Sum II",
    "difficulty": "Med.",
    "acceptance": "63.2%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Path Sum II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #113 - Path Sum II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Path Sum II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar pathSumIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def pathSumIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void pathSumIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void pathSumIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-114",
    "number": 114,
    "title": "Flatten Binary Tree to Linked List",
    "difficulty": "Med.",
    "acceptance": "71.8%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Linked List"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Flatten Binary Tree to Linked List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #114 - Flatten Binary Tree to Linked List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Flatten Binary Tree to Linked List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar flattenBinaryTreeToLinkedList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def flattenBinaryTreeToLinkedList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void flattenBinaryTreeToLinkedList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void flattenBinaryTreeToLinkedList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-115",
    "number": 115,
    "title": "Distinct Subsequences",
    "difficulty": "Hard",
    "acceptance": "54.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Distinct Subsequences, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #115 - Distinct Subsequences.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Distinct Subsequences."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar distinctSubsequences = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def distinctSubsequences(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void distinctSubsequences() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void distinctSubsequences() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-116",
    "number": 116,
    "title": "Populating Next Right Pointers in Each Node",
    "difficulty": "Med.",
    "acceptance": "68.0%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Populating Next Right Pointers in Each Node, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #116 - Populating Next Right Pointers in Each Node.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Populating Next Right Pointers in Each Node."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar populatingNextRightPointersInEachNode = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def populatingNextRightPointersInEachNode(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void populatingNextRightPointersInEachNode() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void populatingNextRightPointersInEachNode() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-117",
    "number": 117,
    "title": "Populating Next Right Pointers in Each Node II",
    "difficulty": "Med.",
    "acceptance": "58.5%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Populating Next Right Pointers in Each Node II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #117 - Populating Next Right Pointers in Each Node II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Populating Next Right Pointers in Each Node II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar populatingNextRightPointersInEachNodeIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def populatingNextRightPointersInEachNodeIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void populatingNextRightPointersInEachNodeIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void populatingNextRightPointersInEachNodeIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-118",
    "number": 118,
    "title": "Pascal's Triangle",
    "difficulty": "Easy",
    "acceptance": "79.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Pascal's Triangle, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #118 - Pascal's Triangle.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Pascal's Triangle."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar pascalsTriangle = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def pascalsTriangle(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void pascalsTriangle() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void pascalsTriangle() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-119",
    "number": 119,
    "title": "Pascal's Triangle II",
    "difficulty": "Easy",
    "acceptance": "68.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Pascal's Triangle II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #119 - Pascal's Triangle II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Pascal's Triangle II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar pascalsTriangleIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def pascalsTriangleIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void pascalsTriangleIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void pascalsTriangleIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-120",
    "number": 120,
    "title": "Triangle",
    "difficulty": "Med.",
    "acceptance": "60.0%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Triangle, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #120 - Triangle.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Triangle."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar triangle = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def triangle(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void triangle() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void triangle() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-121",
    "number": 121,
    "title": "Best Time to Buy and Sell Stock",
    "difficulty": "Easy",
    "acceptance": "57.6%",
    "category": "JavaScript",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "solved",
    "frequency": 2,
    "description": "Given the input parameters for Best Time to Buy and Sell Stock, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #121 - Best Time to Buy and Sell Stock.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Best Time to Buy and Sell Stock."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar bestTimeToBuyAndSellStock = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def bestTimeToBuyAndSellStock(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void bestTimeToBuyAndSellStock() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void bestTimeToBuyAndSellStock() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-122",
    "number": 122,
    "title": "Best Time to Buy and Sell Stock II",
    "difficulty": "Med.",
    "acceptance": "71.8%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Best Time to Buy and Sell Stock II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #122 - Best Time to Buy and Sell Stock II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Best Time to Buy and Sell Stock II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar bestTimeToBuyAndSellStockIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def bestTimeToBuyAndSellStockIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void bestTimeToBuyAndSellStockIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void bestTimeToBuyAndSellStockIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-123",
    "number": 123,
    "title": "Best Time to Buy and Sell Stock III",
    "difficulty": "Hard",
    "acceptance": "55.1%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Best Time to Buy and Sell Stock III, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #123 - Best Time to Buy and Sell Stock III.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Best Time to Buy and Sell Stock III."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar bestTimeToBuyAndSellStockIii = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def bestTimeToBuyAndSellStockIii(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void bestTimeToBuyAndSellStockIii() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void bestTimeToBuyAndSellStockIii() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-124",
    "number": 124,
    "title": "Binary Tree Maximum Path Sum",
    "difficulty": "Hard",
    "acceptance": "43.0%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "Array",
      "Dynamic Programming"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Binary Tree Maximum Path Sum, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #124 - Binary Tree Maximum Path Sum.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Maximum Path Sum."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeMaximumPathSum = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeMaximumPathSum(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeMaximumPathSum() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeMaximumPathSum() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-125",
    "number": 125,
    "title": "Valid Palindrome",
    "difficulty": "Easy",
    "acceptance": "54.6%",
    "category": "JavaScript",
    "tags": [
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Valid Palindrome, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #125 - Valid Palindrome.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Valid Palindrome."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar validPalindrome = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def validPalindrome(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validPalindrome() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validPalindrome() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-126",
    "number": 126,
    "title": "Word Ladder II",
    "difficulty": "Hard",
    "acceptance": "28.3%",
    "category": "Algorithms",
    "tags": [
      "String",
      "Depth-First Search",
      "Breadth-First Search",
      "Graph"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Word Ladder II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #126 - Word Ladder II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Ladder II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wordLadderIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wordLadderIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordLadderIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordLadderIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-127",
    "number": 127,
    "title": "Word Ladder",
    "difficulty": "Hard",
    "acceptance": "46.9%",
    "category": "Algorithms",
    "tags": [
      "String",
      "Depth-First Search",
      "Breadth-First Search",
      "Graph"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Word Ladder, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #127 - Word Ladder.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Ladder."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wordLadder = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wordLadder(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordLadder() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordLadder() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-128",
    "number": 128,
    "title": "Longest Consecutive Sequence",
    "difficulty": "Med.",
    "acceptance": "47.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Longest Consecutive Sequence, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #128 - Longest Consecutive Sequence.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Longest Consecutive Sequence."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar longestConsecutiveSequence = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def longestConsecutiveSequence(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void longestConsecutiveSequence() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void longestConsecutiveSequence() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-129",
    "number": 129,
    "title": "Sum Root to Leaf Numbers",
    "difficulty": "Med.",
    "acceptance": "70.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Sum Root to Leaf Numbers, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #129 - Sum Root to Leaf Numbers.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Sum Root to Leaf Numbers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sumRootToLeafNumbers = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sumRootToLeafNumbers(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sumRootToLeafNumbers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sumRootToLeafNumbers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-130",
    "number": 130,
    "title": "Surrounded Regions",
    "difficulty": "Med.",
    "acceptance": "46.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Surrounded Regions, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #130 - Surrounded Regions.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Surrounded Regions."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar surroundedRegions = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def surroundedRegions(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void surroundedRegions() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void surroundedRegions() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-131",
    "number": 131,
    "title": "Palindrome Partitioning",
    "difficulty": "Med.",
    "acceptance": "74.9%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Palindrome Partitioning, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #131 - Palindrome Partitioning.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Palindrome Partitioning."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar palindromePartitioning = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def palindromePartitioning(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void palindromePartitioning() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void palindromePartitioning() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-132",
    "number": 132,
    "title": "Palindrome Partitioning II",
    "difficulty": "Hard",
    "acceptance": "38.3%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Palindrome Partitioning II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #132 - Palindrome Partitioning II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Palindrome Partitioning II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar palindromePartitioningIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def palindromePartitioningIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void palindromePartitioningIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void palindromePartitioningIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-133",
    "number": 133,
    "title": "Clone Graph",
    "difficulty": "Med.",
    "acceptance": "66.5%",
    "category": "Algorithms",
    "tags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Clone Graph, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #133 - Clone Graph.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Clone Graph."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar cloneGraph = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def cloneGraph(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void cloneGraph() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void cloneGraph() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-134",
    "number": 134,
    "title": "Gas Station",
    "difficulty": "Med.",
    "acceptance": "49.0%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Gas Station, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #134 - Gas Station.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Gas Station."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar gasStation = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def gasStation(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void gasStation() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void gasStation() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-135",
    "number": 135,
    "title": "Candy",
    "difficulty": "Hard",
    "acceptance": "49.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Candy, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #135 - Candy.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Candy."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar candy = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def candy(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void candy() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void candy() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-136",
    "number": 136,
    "title": "Single Number",
    "difficulty": "Easy",
    "acceptance": "78.5%",
    "category": "JavaScript",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Single Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #136 - Single Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Single Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar singleNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def singleNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void singleNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void singleNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-137",
    "number": 137,
    "title": "Single Number II",
    "difficulty": "Med.",
    "acceptance": "68.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Single Number II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #137 - Single Number II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Single Number II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar singleNumberIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def singleNumberIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void singleNumberIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void singleNumberIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-138",
    "number": 138,
    "title": "Copy List with Random Pointer",
    "difficulty": "Med.",
    "acceptance": "64.0%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Copy List with Random Pointer, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #138 - Copy List with Random Pointer.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Copy List with Random Pointer."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar copyListWithRandomPointer = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def copyListWithRandomPointer(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void copyListWithRandomPointer() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void copyListWithRandomPointer() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-139",
    "number": 139,
    "title": "Word Break",
    "difficulty": "Med.",
    "acceptance": "50.1%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Word Break, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #139 - Word Break.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Break."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wordBreak = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wordBreak(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordBreak() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordBreak() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-140",
    "number": 140,
    "title": "Word Break II",
    "difficulty": "Hard",
    "acceptance": "56.5%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Word Break II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #140 - Word Break II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Break II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar wordBreakIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def wordBreakIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordBreakIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordBreakIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-141",
    "number": 141,
    "title": "Linked List Cycle",
    "difficulty": "Easy",
    "acceptance": "55.3%",
    "category": "JavaScript",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Linked List Cycle, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #141 - Linked List Cycle.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Linked List Cycle."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar linkedListCycle = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def linkedListCycle(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void linkedListCycle() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void linkedListCycle() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-142",
    "number": 142,
    "title": "Linked List Cycle II",
    "difficulty": "Med.",
    "acceptance": "59.6%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Linked List Cycle II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #142 - Linked List Cycle II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Linked List Cycle II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar linkedListCycleIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def linkedListCycleIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void linkedListCycleIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void linkedListCycleIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-143",
    "number": 143,
    "title": "Reorder List",
    "difficulty": "Med.",
    "acceptance": "66.6%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Reorder List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #143 - Reorder List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reorder List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reorderList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reorderList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reorderList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reorderList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-144",
    "number": 144,
    "title": "Binary Tree Preorder Traversal",
    "difficulty": "Easy",
    "acceptance": "76.9%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Binary Tree Preorder Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #144 - Binary Tree Preorder Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Preorder Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreePreorderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreePreorderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreePreorderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreePreorderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-145",
    "number": 145,
    "title": "Binary Tree Postorder Traversal",
    "difficulty": "Easy",
    "acceptance": "79.3%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Binary Tree Postorder Traversal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #145 - Binary Tree Postorder Traversal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Postorder Traversal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreePostorderTraversal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreePostorderTraversal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreePostorderTraversal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreePostorderTraversal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-146",
    "number": 146,
    "title": "LRU Cache",
    "difficulty": "Med.",
    "acceptance": "48.4%",
    "category": "Concurrency",
    "tags": [
      "Design",
      "Concurrency",
      "Hash Table"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for LRU Cache, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #146 - LRU Cache.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for LRU Cache."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar lruCache = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def lruCache(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void lruCache() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void lruCache() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-147",
    "number": 147,
    "title": "Insertion Sort List",
    "difficulty": "Med.",
    "acceptance": "60.7%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Insertion Sort List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #147 - Insertion Sort List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Insertion Sort List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar insertionSortList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def insertionSortList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void insertionSortList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void insertionSortList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-148",
    "number": 148,
    "title": "Sort List",
    "difficulty": "Med.",
    "acceptance": "65.7%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Sort List, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #148 - Sort List.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Sort List."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar sortList = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def sortList(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void sortList() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void sortList() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-149",
    "number": 149,
    "title": "Max Points on a Line",
    "difficulty": "Hard",
    "acceptance": "31.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Max Points on a Line, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #149 - Max Points on a Line.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Max Points on a Line."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maxPointsOnALine = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maxPointsOnALine(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maxPointsOnALine() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maxPointsOnALine() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-150",
    "number": 150,
    "title": "Evaluate Reverse Polish Notation",
    "difficulty": "Med.",
    "acceptance": "59.1%",
    "category": "Algorithms",
    "tags": [
      "Stack"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Evaluate Reverse Polish Notation, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #150 - Evaluate Reverse Polish Notation.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Evaluate Reverse Polish Notation."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar evaluateReversePolishNotation = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def evaluateReversePolishNotation(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void evaluateReversePolishNotation() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void evaluateReversePolishNotation() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-151",
    "number": 151,
    "title": "Reverse Words in a String",
    "difficulty": "Med.",
    "acceptance": "58.2%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Reverse Words in a String, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #151 - Reverse Words in a String.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Words in a String."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseWordsInAString = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseWordsInAString(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseWordsInAString() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseWordsInAString() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-152",
    "number": 152,
    "title": "Maximum Product Subarray",
    "difficulty": "Med.",
    "acceptance": "37.3%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Maximum Product Subarray, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #152 - Maximum Product Subarray.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Maximum Product Subarray."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maximumProductSubarray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maximumProductSubarray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maximumProductSubarray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maximumProductSubarray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-153",
    "number": 153,
    "title": "Find Minimum in Rotated Sorted Array",
    "difficulty": "Med.",
    "acceptance": "55.5%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Find Minimum in Rotated Sorted Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #153 - Find Minimum in Rotated Sorted Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Find Minimum in Rotated Sorted Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar findMinimumInRotatedSortedArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def findMinimumInRotatedSortedArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void findMinimumInRotatedSortedArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void findMinimumInRotatedSortedArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-154",
    "number": 154,
    "title": "Find Minimum in Rotated Sorted Array II",
    "difficulty": "Hard",
    "acceptance": "47.2%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Find Minimum in Rotated Sorted Array II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #154 - Find Minimum in Rotated Sorted Array II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Find Minimum in Rotated Sorted Array II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar findMinimumInRotatedSortedArrayIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def findMinimumInRotatedSortedArrayIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void findMinimumInRotatedSortedArrayIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void findMinimumInRotatedSortedArrayIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-155",
    "number": 155,
    "title": "Min Stack",
    "difficulty": "Med.",
    "acceptance": "58.9%",
    "category": "Concurrency",
    "tags": [
      "Design",
      "Concurrency",
      "Hash Table"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Min Stack, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #155 - Min Stack.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Min Stack."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar minStack = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def minStack(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void minStack() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void minStack() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-156",
    "number": 156,
    "title": "Binary Tree Upside Down",
    "difficulty": "Med.",
    "acceptance": "65.7%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Binary Tree Upside Down, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #156 - Binary Tree Upside Down.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Upside Down."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeUpsideDown = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeUpsideDown(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeUpsideDown() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeUpsideDown() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-157",
    "number": 157,
    "title": "Read N Characters Given Read4",
    "difficulty": "Easy",
    "acceptance": "42.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Read N Characters Given Read4, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #157 - Read N Characters Given Read4.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Read N Characters Given Read4."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar readNCharactersGivenRead4 = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def readNCharactersGivenRead4(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void readNCharactersGivenRead4() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void readNCharactersGivenRead4() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-158",
    "number": 158,
    "title": "Read N Characters Given read4 II - Call Multiple Times",
    "difficulty": "Hard",
    "acceptance": "43.4%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Read N Characters Given read4 II - Call Multiple Times, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #158 - Read N Characters Given read4 II - Call Multiple Times.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Read N Characters Given read4 II - Call Multiple Times."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar readNCharactersGivenRead4IiCallMultipleTimes = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def readNCharactersGivenRead4IiCallMultipleTimes(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void readNCharactersGivenRead4IiCallMultipleTimes() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void readNCharactersGivenRead4IiCallMultipleTimes() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-159",
    "number": 159,
    "title": "Longest Substring with At Most Two Distinct Characters",
    "difficulty": "Med.",
    "acceptance": "57.2%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree",
      "String"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Longest Substring with At Most Two Distinct Characters, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #159 - Longest Substring with At Most Two Distinct Characters.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Longest Substring with At Most Two Distinct Characters."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar longestSubstringWithAtMostTwoDistinctCharacters = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def longestSubstringWithAtMostTwoDistinctCharacters(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void longestSubstringWithAtMostTwoDistinctCharacters() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void longestSubstringWithAtMostTwoDistinctCharacters() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-160",
    "number": 160,
    "title": "Intersection of Two Linked Lists",
    "difficulty": "Easy",
    "acceptance": "65.0%",
    "category": "Algorithms",
    "tags": [
      "Linked List"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Intersection of Two Linked Lists, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #160 - Intersection of Two Linked Lists.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Intersection of Two Linked Lists."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar intersectionOfTwoLinkedLists = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def intersectionOfTwoLinkedLists(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void intersectionOfTwoLinkedLists() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void intersectionOfTwoLinkedLists() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-161",
    "number": 161,
    "title": "One Edit Distance",
    "difficulty": "Med.",
    "acceptance": "34.6%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for One Edit Distance, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #161 - One Edit Distance.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for One Edit Distance."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar oneEditDistance = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def oneEditDistance(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void oneEditDistance() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void oneEditDistance() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-162",
    "number": 162,
    "title": "Find Peak Element",
    "difficulty": "Med.",
    "acceptance": "47.3%",
    "category": "Algorithms",
    "tags": [
      "Binary Search"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Find Peak Element, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #162 - Find Peak Element.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Find Peak Element."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar findPeakElement = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def findPeakElement(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void findPeakElement() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void findPeakElement() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-163",
    "number": 163,
    "title": "Missing Ranges",
    "difficulty": "Easy",
    "acceptance": "35.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Missing Ranges, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #163 - Missing Ranges.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Missing Ranges."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar missingRanges = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def missingRanges(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void missingRanges() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void missingRanges() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-164",
    "number": 164,
    "title": "Maximum Gap",
    "difficulty": "Med.",
    "acceptance": "53.5%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Maximum Gap, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #164 - Maximum Gap.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Maximum Gap."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar maximumGap = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def maximumGap(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void maximumGap() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void maximumGap() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-165",
    "number": 165,
    "title": "Compare Version Numbers",
    "difficulty": "Med.",
    "acceptance": "47.2%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Compare Version Numbers, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #165 - Compare Version Numbers.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Compare Version Numbers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar compareVersionNumbers = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def compareVersionNumbers(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void compareVersionNumbers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void compareVersionNumbers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-166",
    "number": 166,
    "title": "Fraction to Recurring Decimal",
    "difficulty": "Med.",
    "acceptance": "31.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Fraction to Recurring Decimal, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #166 - Fraction to Recurring Decimal.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Fraction to Recurring Decimal."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar fractionToRecurringDecimal = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def fractionToRecurringDecimal(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void fractionToRecurringDecimal() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void fractionToRecurringDecimal() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-167",
    "number": 167,
    "title": "Two Sum II - Input Array Is Sorted",
    "difficulty": "Med.",
    "acceptance": "66.1%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Two Sum II - Input Array Is Sorted, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #167 - Two Sum II - Input Array Is Sorted.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Two Sum II - Input Array Is Sorted."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar twoSumIiInputArrayIsSorted = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def twoSumIiInputArrayIsSorted(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void twoSumIiInputArrayIsSorted() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void twoSumIiInputArrayIsSorted() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-168",
    "number": 168,
    "title": "Excel Sheet Column Title",
    "difficulty": "Easy",
    "acceptance": "48.0%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Excel Sheet Column Title, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #168 - Excel Sheet Column Title.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Excel Sheet Column Title."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar excelSheetColumnTitle = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def excelSheetColumnTitle(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void excelSheetColumnTitle() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void excelSheetColumnTitle() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-169",
    "number": 169,
    "title": "Majority Element",
    "difficulty": "Easy",
    "acceptance": "66.5%",
    "category": "JavaScript",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Majority Element, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #169 - Majority Element.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Majority Element."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar majorityElement = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def majorityElement(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void majorityElement() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void majorityElement() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-170",
    "number": 170,
    "title": "Two Sum III - Data structure design",
    "difficulty": "Easy",
    "acceptance": "39.3%",
    "category": "Concurrency",
    "tags": [
      "Design",
      "Concurrency",
      "Hash Table"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Two Sum III - Data structure design, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #170 - Two Sum III - Data structure design.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Two Sum III - Data structure design."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar twoSumIiiDataStructureDesign = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def twoSumIiiDataStructureDesign(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void twoSumIiiDataStructureDesign() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void twoSumIiiDataStructureDesign() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-171",
    "number": 171,
    "title": "Excel Sheet Column Number",
    "difficulty": "Easy",
    "acceptance": "68.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Excel Sheet Column Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #171 - Excel Sheet Column Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Excel Sheet Column Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar excelSheetColumnNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def excelSheetColumnNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void excelSheetColumnNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void excelSheetColumnNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-172",
    "number": 172,
    "title": "Factorial Trailing Zeroes",
    "difficulty": "Med.",
    "acceptance": "47.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Factorial Trailing Zeroes, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #172 - Factorial Trailing Zeroes.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Factorial Trailing Zeroes."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar factorialTrailingZeroes = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def factorialTrailingZeroes(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void factorialTrailingZeroes() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void factorialTrailingZeroes() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-173",
    "number": 173,
    "title": "Binary Search Tree Iterator",
    "difficulty": "Med.",
    "acceptance": "77.2%",
    "category": "Concurrency",
    "tags": [
      "Design",
      "Concurrency",
      "Hash Table"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Binary Search Tree Iterator, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #173 - Binary Search Tree Iterator.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Search Tree Iterator."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binarySearchTreeIterator = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binarySearchTreeIterator(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binarySearchTreeIterator() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binarySearchTreeIterator() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-174",
    "number": 174,
    "title": "Dungeon Game",
    "difficulty": "Hard",
    "acceptance": "42.6%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Dungeon Game, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #174 - Dungeon Game.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Dungeon Game."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar dungeonGame = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def dungeonGame(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void dungeonGame() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void dungeonGame() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-175",
    "number": 175,
    "title": "Combine Two Tables",
    "difficulty": "Easy",
    "acceptance": "80.2%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #175 - Combine Two Tables.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Combine Two Tables."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void combineTwoTables() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void combineTwoTables() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-176",
    "number": 176,
    "title": "Second Highest Salary",
    "difficulty": "Med.",
    "acceptance": "48.9%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #176 - Second Highest Salary.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Second Highest Salary."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void secondHighestSalary() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void secondHighestSalary() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-177",
    "number": 177,
    "title": "Nth Highest Salary",
    "difficulty": "Med.",
    "acceptance": "40.6%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #177 - Nth Highest Salary.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Nth Highest Salary."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void nthHighestSalary() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void nthHighestSalary() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-178",
    "number": 178,
    "title": "Rank Scores",
    "difficulty": "Med.",
    "acceptance": "69.3%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #178 - Rank Scores.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Rank Scores."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void rankScores() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void rankScores() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-179",
    "number": 179,
    "title": "Largest Number",
    "difficulty": "Med.",
    "acceptance": "44.1%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Largest Number, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #179 - Largest Number.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Largest Number."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar largestNumber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def largestNumber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void largestNumber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void largestNumber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-180",
    "number": 180,
    "title": "Consecutive Numbers",
    "difficulty": "Med.",
    "acceptance": "49.9%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #180 - Consecutive Numbers.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Consecutive Numbers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void consecutiveNumbers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void consecutiveNumbers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-181",
    "number": 181,
    "title": "Employees Earning More Than Their Managers",
    "difficulty": "Easy",
    "acceptance": "74.1%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #181 - Employees Earning More Than Their Managers.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Employees Earning More Than Their Managers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void employeesEarningMoreThanTheirManagers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void employeesEarningMoreThanTheirManagers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-182",
    "number": 182,
    "title": "Duplicate Emails",
    "difficulty": "Easy",
    "acceptance": "74.7%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #182 - Duplicate Emails.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Duplicate Emails."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void duplicateEmails() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void duplicateEmails() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-183",
    "number": 183,
    "title": "Customers Who Never Order",
    "difficulty": "Easy",
    "acceptance": "72.7%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #183 - Customers Who Never Order.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Customers Who Never Order."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void customersWhoNeverOrder() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void customersWhoNeverOrder() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-184",
    "number": 184,
    "title": "Department Highest Salary",
    "difficulty": "Med.",
    "acceptance": "60.1%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #184 - Department Highest Salary.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Department Highest Salary."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void departmentHighestSalary() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void departmentHighestSalary() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-185",
    "number": 185,
    "title": "Department Top Three Salaries",
    "difficulty": "Hard",
    "acceptance": "62.4%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #185 - Department Top Three Salaries.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Department Top Three Salaries."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void departmentTopThreeSalaries() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void departmentTopThreeSalaries() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-186",
    "number": 186,
    "title": "Reverse Words in a String II",
    "difficulty": "Med.",
    "acceptance": "56.9%",
    "category": "Algorithms",
    "tags": [
      "String"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Reverse Words in a String II, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #186 - Reverse Words in a String II.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Words in a String II."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseWordsInAStringIi = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseWordsInAStringIi(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseWordsInAStringIi() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseWordsInAStringIi() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-187",
    "number": 187,
    "title": "Repeated DNA Sequences",
    "difficulty": "Med.",
    "acceptance": "54.3%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Given the input parameters for Repeated DNA Sequences, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #187 - Repeated DNA Sequences.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Repeated DNA Sequences."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar repeatedDnaSequences = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def repeatedDnaSequences(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void repeatedDnaSequences() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void repeatedDnaSequences() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-188",
    "number": 188,
    "title": "Best Time to Buy and Sell Stock IV",
    "difficulty": "Hard",
    "acceptance": "51.7%",
    "category": "Algorithms",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for Best Time to Buy and Sell Stock IV, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #188 - Best Time to Buy and Sell Stock IV.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Best Time to Buy and Sell Stock IV."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar bestTimeToBuyAndSellStockIv = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def bestTimeToBuyAndSellStockIv(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void bestTimeToBuyAndSellStockIv() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void bestTimeToBuyAndSellStockIv() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-189",
    "number": 189,
    "title": "Rotate Array",
    "difficulty": "Med.",
    "acceptance": "45.8%",
    "category": "Algorithms",
    "tags": [
      "Array"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Rotate Array, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #189 - Rotate Array.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Rotate Array."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar rotateArray = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def rotateArray(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void rotateArray() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void rotateArray() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-190",
    "number": 190,
    "title": "Reverse Bits",
    "difficulty": "Easy",
    "acceptance": "69.7%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Given the input parameters for Reverse Bits, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #190 - Reverse Bits.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Reverse Bits."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar reverseBits = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def reverseBits(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void reverseBits() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void reverseBits() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-191",
    "number": 191,
    "title": "Number of 1 Bits",
    "difficulty": "Easy",
    "acceptance": "77.8%",
    "category": "Algorithms",
    "tags": [
      "Array",
      "Algorithms"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Given the input parameters for Number of 1 Bits, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #191 - Number of 1 Bits.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Number of 1 Bits."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar numberOf1Bits = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def numberOf1Bits(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void numberOf1Bits() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void numberOf1Bits() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-192",
    "number": 192,
    "title": "Word Frequency",
    "difficulty": "Med.",
    "acceptance": "30.5%",
    "category": "Shell",
    "tags": [
      "Shell",
      "Bash"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Write a bash script to solve the problem given the input file.\n\nProblem Reference: LeetCode #192 - Word Frequency.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Word Frequency."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "# Read from file and output to stdout\ncat file.txt | sort | uniq -c",
      "python": "class Solution:\n    def wordFrequency(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void wordFrequency() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void wordFrequency() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-193",
    "number": 193,
    "title": "Valid Phone Numbers",
    "difficulty": "Easy",
    "acceptance": "31.4%",
    "category": "Shell",
    "tags": [
      "Shell",
      "Bash"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Write a bash script to solve the problem given the input file.\n\nProblem Reference: LeetCode #193 - Valid Phone Numbers.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Valid Phone Numbers."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "# Read from file and output to stdout\ncat file.txt | sort | uniq -c",
      "python": "class Solution:\n    def validPhoneNumbers(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void validPhoneNumbers() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void validPhoneNumbers() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-194",
    "number": 194,
    "title": "Transpose File",
    "difficulty": "Med.",
    "acceptance": "34.4%",
    "category": "Shell",
    "tags": [
      "Shell",
      "Bash"
    ],
    "companies": [
      "Bloomberg",
      "Amazon",
      "Meta"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Write a bash script to solve the problem given the input file.\n\nProblem Reference: LeetCode #194 - Transpose File.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Transpose File."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "# Read from file and output to stdout\ncat file.txt | sort | uniq -c",
      "python": "class Solution:\n    def transposeFile(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void transposeFile() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void transposeFile() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-195",
    "number": 195,
    "title": "Tenth Line",
    "difficulty": "Easy",
    "acceptance": "38.3%",
    "category": "Shell",
    "tags": [
      "Shell",
      "Bash"
    ],
    "companies": [
      "Uber",
      "Google",
      "Apple"
    ],
    "status": "todo",
    "frequency": 1,
    "description": "Write a bash script to solve the problem given the input file.\n\nProblem Reference: LeetCode #195 - Tenth Line.",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Tenth Line."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "# Read from file and output to stdout\ncat file.txt | sort | uniq -c",
      "python": "class Solution:\n    def tenthLine(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void tenthLine() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void tenthLine() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-196",
    "number": 196,
    "title": "Delete Duplicate Emails",
    "difficulty": "Easy",
    "acceptance": "67.2%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Amazon",
      "Meta",
      "Microsoft"
    ],
    "status": "todo",
    "frequency": 2,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #196 - Delete Duplicate Emails.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Delete Duplicate Emails."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void deleteDuplicateEmails() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void deleteDuplicateEmails() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-197",
    "number": 197,
    "title": "Rising Temperature",
    "difficulty": "Easy",
    "acceptance": "52.5%",
    "category": "Database",
    "tags": [
      "Database",
      "SQL"
    ],
    "companies": [
      "Google",
      "Apple",
      "Bloomberg"
    ],
    "status": "todo",
    "frequency": 3,
    "description": "Write an SQL query to solve the problem for the tables defined in the schema. Return the result table in any order.\n\nProblem Reference: LeetCode #197 - Rising Temperature.",
    "examples": [
      {
        "input": "Table: Schema as specified",
        "output": "+----+-------+\n| id | value |\n+----+-------+",
        "explanation": "Standard expected solution for Rising Temperature."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "-- Write your PostgreSQL/MySQL query below\nSELECT * FROM TableName;",
      "python": "# Write your SQL solution\nquery = \"SELECT * FROM TableName\"",
      "cpp": "class Solution {\npublic:\n    void risingTemperature() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void risingTemperature() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-198",
    "number": 198,
    "title": "House Robber",
    "difficulty": "Med.",
    "acceptance": "53.7%",
    "category": "JavaScript",
    "tags": [
      "Dynamic Programming"
    ],
    "companies": [
      "Meta",
      "Microsoft",
      "Uber"
    ],
    "status": "todo",
    "frequency": 4,
    "description": "Given the input parameters for House Robber, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #198 - House Robber.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for House Robber."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar houseRobber = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def houseRobber(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void houseRobber() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void houseRobber() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-199",
    "number": 199,
    "title": "Binary Tree Right Side View",
    "difficulty": "Med.",
    "acceptance": "71.5%",
    "category": "Algorithms",
    "tags": [
      "Tree",
      "Binary Search Tree"
    ],
    "companies": [
      "Apple",
      "Bloomberg",
      "Amazon"
    ],
    "status": "todo",
    "frequency": 5,
    "description": "Given the input parameters for Binary Tree Right Side View, implement an efficient algorithm to return the expected result.\n\nProblem Reference: LeetCode #199 - Binary Tree Right Side View.\nTime Complexity Target: O(n) or O(log n).",
    "examples": [
      {
        "input": "nums = [2, 7, 11, 15], target = 9",
        "output": "[0, 1]",
        "explanation": "Standard expected solution for Binary Tree Right Side View."
      }
    ],
    "constraints": [
      "1 <= input.length <= 10^5",
      "-10^9 <= input[i] <= 10^9",
      "Optimal time and space complexities required."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {any} input\n * @return {any}\n */\nvar binaryTreeRightSideView = function(input) {\n    // Write your solution here\n    return input;\n};",
      "python": "class Solution:\n    def binaryTreeRightSideView(self, input):\n        # Implement solution\n        return input",
      "cpp": "class Solution {\npublic:\n    void binaryTreeRightSideView() {\n        // C++ Solution\n    }\n};",
      "java": "class Solution {\n    public void binaryTreeRightSideView() {\n        // Java Solution\n    }\n}"
    },
    "testCases": [
      {
        "input": "Test Case 1",
        "expected": "Passed"
      },
      {
        "input": "Test Case 2",
        "expected": "Passed"
      }
    ]
  },
  {
    "id": "prob-200",
    "number": 200,
    "title": "Number of Islands",
    "difficulty": "Med.",
    "acceptance": "59.8%",
    "category": "JavaScript",
    "tags": [
      "Depth-First Search",
      "Breadth-First Search",
      "Graph"
    ],
    "companies": [
      "Microsoft",
      "Uber",
      "Google"
    ],
    "status": "attempted",
    "frequency": 1,
    "description": "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.\n\nAn island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.",
    "examples": [
      {
        "input": "grid = [\n  [\"1\",\"1\",\"1\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"1\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"0\",\"0\"]\n]",
        "output": "1"
      },
      {
        "input": "grid = [\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"1\",\"1\",\"0\",\"0\",\"0\"],\n  [\"0\",\"0\",\"1\",\"0\",\"0\"],\n  [\"0\",\"0\",\"0\",\"1\",\"1\"]\n]",
        "output": "3"
      }
    ],
    "constraints": [
      "m == grid.length",
      "n == grid[i].length",
      "1 <= m, n <= 300",
      "grid[i][j] is \"0\" or \"1\"."
    ],
    "starterCode": {
      "javascript": "/**\n * @param {character[][]} grid\n * @return {number}\n */\nvar numIslands = function(grid) {\n    if (!grid || grid.length === 0) return 0;\n    let count = 0;\n    const m = grid.length, n = grid[0].length;\n    \n    function dfs(r, c) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] !== '1') return;\n        grid[r][c] = '0';\n        dfs(r + 1, c);\n        dfs(r - 1, c);\n        dfs(r, c + 1);\n        dfs(r, c - 1);\n    }\n    \n    for (let i = 0; i < m; i++) {\n        for (let j = 0; j < n; j++) {\n            if (grid[i][j] === '1') {\n                count++;\n                dfs(i, j);\n            }\n        }\n    }\n    return count;\n};",
      "python": "class Solution:\n    def numIslands(self, grid: List[List[str]]) -> int:\n        if not grid: return 0\n        m, n = len(grid), len(grid[0])\n        count = 0\n        def dfs(r, c):\n            if r < 0 or r >= m or c < 0 or c >= n or grid[r][c] != '1': return\n            grid[r][c] = '0'\n            dfs(r+1, c); dfs(r-1, c); dfs(r, c+1); dfs(r, c-1)\n        for i in range(m):\n            for j in range(n):\n                if grid[i][j] == '1':\n                    count += 1\n                    dfs(i, j)\n        return count",
      "cpp": "class Solution {\npublic:\n    int numIslands(vector<vector<char>>& grid) {\n        if (grid.empty()) return 0;\n        int m = grid.size(), n = grid[0].size(), count = 0;\n        auto dfs = [&](auto self, int r, int c) -> void {\n            if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n            grid[r][c] = '0';\n            self(self, r+1, c); self(self, r-1, c); self(self, r, c+1); self(self, r, c-1);\n        };\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1') {\n                    count++;\n                    dfs(dfs, i, j);\n                }\n            }\n        }\n        return count;\n    }\n};",
      "java": "class Solution {\n    public int numIslands(char[][] grid) {\n        if (grid == null || grid.length == 0) return 0;\n        int count = 0, m = grid.length, n = grid[0].length;\n        for (int i = 0; i < m; i++) {\n            for (int j = 0; j < n; j++) {\n                if (grid[i][j] == '1') {\n                    count++;\n                    dfs(grid, i, j, m, n);\n                }\n            }\n        }\n        return count;\n    }\n    private void dfs(char[][] grid, int r, int c, int m, int n) {\n        if (r < 0 || r >= m || c < 0 || c >= n || grid[r][c] != '1') return;\n        grid[r][c] = '0';\n        dfs(grid, r+1, c, m, n);\n        dfs(grid, r-1, c, m, n);\n        dfs(grid, r, c+1, m, n);\n        dfs(grid, r, c-1, m, n);\n    }\n}"
    },
    "testCases": [
      {
        "input": "grid = [[\"1\",\"1\",\"0\"],[\"1\",\"1\",\"0\"],[\"0\",\"0\",\"1\"]]",
        "expected": "2"
      },
      {
        "input": "grid = [[\"0\",\"0\"],[\"0\",\"0\"]]",
        "expected": "0"
      }
    ]
  }
];

export const CODING_COMPANIES = [
  { name: 'Amazon', count: 2013 },
  { name: 'Google', count: 2318 },
  { name: 'Meta', count: 1392 },
  { name: 'Apple', count: 279 },
  { name: 'Microsoft', count: 1360 },
  { name: 'Bloomberg', count: 1230 },
  { name: 'Uber', count: 329 },
];
