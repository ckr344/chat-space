class CreateUsers < ActiveRecord::Migration[5.0]
  def change
    create_table :users do |t|
      add_column :users, :email, :string
      add_index :users,  :username
      add_index :users, :email, unique: true
      t.timestamps
    end
  end
end



