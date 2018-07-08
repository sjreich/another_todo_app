class AddUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :username, unique: true
      t.string :email, null: false, unique: true
      t.string :password_digest, null: false

      t.timestamps
    end

    add_reference :tasks, :user, foreign_key: true
  end
end
