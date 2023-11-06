/**
 * @class Memory - Armazena a memória de experiências do agente
 * @param {number} capacity - Capacidade máxima de armazenamento
 * @method store - Armazena uma experiência
 * @method sample - Amostra uma experiência da memória
 */

class Memory {
     constructor(capacity) {
          this.capacity = capacity;
          this.memory = [];
     }

     store(experience) {
          this.memory.push(experience);
          if (this.memory.length > this.capacity) {
               this.memory.shift();
          }
     }

     sample(batchSize) {
          const sample = [];
          for (let i = 0; i < batchSize; i++) {
               const index = Math.floor(Math.random() * this.memory.length);
               sample.push(this.memory[index]);
          }
          return sample;
     }
}

class Agent {
     constructor() {
          this.memory = new Memory(10000);
          this.brain = new Brain();
     }

     act(state) {
          if (Math.random() < epsilon) {
               return Math.floor(Math.random() * 4);
          } else {
               return this.brain.predict(state);
          }
     }

     observe(experience) {
          this.memory.store(experience);
     }

     learn(batchSize) {
          const batch = this.memory.sample(batchSize);
          const states = batch.map(exp => exp.state);
          const actions = batch.map(exp => exp.action);
          const rewards = batch.map(exp => exp.reward);
          const nextStates = batch.map(exp => exp.nextState);
          const terminals = batch.map(exp => exp.terminal);
          const qNext = this.brain.predict(nextStates);
          const q = this.brain.predict(states);
          for (let i = 0; i < batchSize; i++) {
               if (terminals[i]) {
                    q[i][actions[i]] = rewards[i];
               } else {
                    q[i][actions[i]] = rewards[i] + gamma * Math.max(...qNext[i]);
               }
          }
          this.brain.train(states, q);
     }

     remember(state, action, reward, nextState, terminal) {
          this.observe({
               state: state,
               action: action,
               reward: reward,
               nextState: nextState,
               terminal: terminal
          });
     }

     save() {
          this.brain.save();
     }

}

