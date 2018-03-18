class Task < ApplicationRecord
  def complete?
    completed_at.present?
  end

  def complete!
    update(completed_at: Time.current)
  end
end
