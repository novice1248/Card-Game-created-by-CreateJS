class Enemy {
    constructor(name, health) {
        this.name = name;
        this.health = health;
    }

    takeDamage(amount) {
        this.health -= amount;
        console.log(this.name + " health: " + this.health);
    }

    attack(player) {
        const damage = Math.floor(Math.random() * 10) + 1; // 1~10のランダムダメージ
        player.takeDamage(damage);
        console.log(this.name + " attacks! Player health is now: " + player.health);
    }
}
