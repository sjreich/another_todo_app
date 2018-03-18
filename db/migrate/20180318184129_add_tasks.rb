class AddTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.string :title, null: false
      t.text :description
      t.timestamp :completed_at

      t.timestamps
    end
  end
end
