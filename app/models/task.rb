class Task < ApplicationRecord
  belongs_to :user, dependent: :destroy

  def complete?
    completed_at.present?
  end

  def complete!
    update!(completed_at: Time.current)
  end

  def uncomplete!
    update!(completed_at: nil)
  end

  def to_h
    {
      id: id,
      title: title,
      description: description,
      is_complete: complete?,
      created_at: created_at,
    }
  end
end
