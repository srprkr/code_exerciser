puts "StAcKs oF CaNs!!!"

# Count how many steps it takes to reduce a pile to the second highest stack but removing the difference from the highest stack.

input = [5, 5, 1, 2]
second_highest = nil
lowest_height = nil

adjust_second_height = lambda do |arr|
  # uniq cols
  unique_heights_arr = arr.uniq.sort { |a, b| b <=> a }

  # get second highest stack
  second_highest = unique_heights_arr[1]
  puts second_highest

  # get lowest stack (for stopping).
  lowest_height = unique_heights_arr[-1]
end

adjust_second_height.call(input)
puts "Lowest Ht: #{lowest_height}"

change_count = 0

equalize_heights = lambda do |arr|
  arr.each_with_index do |value, index|
    # count cols above second_highest. Add to count.
    # track count - update input arr for next round
    if value > second_highest
      change_count += 1
      arr[index] = second_highest
    end
  end
end

while input.max > lowest_height
  equalize_heights.call(input)
  adjust_second_height.call(input)
end

puts "inpUT! #{input}"
puts "changeCount: #{change_count}"
