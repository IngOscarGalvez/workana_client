export default {
    async login(context, payload) {
        try {
            const url = `${process.env.VUE_APP_ROOT_API}api/v1/auth/login/`;
            let result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "Failed to authenticate. Check your login data."
                );
                throw error;
            }

            await context.commit("authUser", response_data.result);
            // context.dispatch("autoLogout", response_data.result);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    autoLogout(context, _) {
        const expire_at = JSON.parse(localStorage.getItem('token_expiration'));
        const revoke_token = expire_at * 1000;
        setTimeout(function () {
            context.dispatch("logout");
        }, revoke_token);
    },

    async logout(context, _) {
        try {
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }
            await context.dispatch('clearSessionData');

            const url = process.env.VUE_APP_ROOT_API + 'api/v1/auth/revokeToken';

            const result = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });

            const response_data = await result.json();
            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "Failed to logout."
                );
                throw error;
            }

            window.location.reload();
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    getToken(_, __) {
        const token = JSON.parse(localStorage.getItem("token"));
        return token.accessToken ? token.accessToken : null;
    },

    async clearSessionData(context, _) {
        await context.commit('clearSessionData');
    },

    async register(context, payload) {
        try {

            const url = process.env.VUE_APP_ROOT_API + 'api/v1/auth/register';

            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(payload)
            });
            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "Registration failed, please verify your details."
                );
                throw error;
            }

            const data_to_auto_login = {
                email: payload.email,
                password: payload.password
            };

            await context.dispatch('login', data_to_auto_login);

        } catch (error) {
            console.log(error)
            return error;
        }
    },

    async getRooms(context, _) {
        try {
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }

            const url = process.env.VUE_APP_ROOT_API + 'api/v1/room';
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "The request fails when trying to get the rooms."
                );
                throw error;
            }
            await context.commit('setRooms', response_data.result.rooms);

        } catch (error) {
            console.log(error);
            return errro;
        }
    },

    async getRoomUsers(context, payload) {
        try {
            const url = process.env.VUE_APP_ROOT_API + `api/v1/room/${payload.id}`;
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            });
            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "Failed to get users from the room."
                );
                throw error;
            }

            context.commit('setRoomUsers', response_data.result.room);

        } catch (error) {
            console.log(error)
            return error;
        }
    },

    async joinMe(context, payload) {
        try {
            const user = await JSON.parse(localStorage.getItem('user'));
            if (!user) {
                throw new Error('The user does not exist.');
            }
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }

            const url = process.env.VUE_APP_ROOT_API + 'api/v1/joinMe';
            const data_to_send = {
                room_id: payload.room_id,
                user_id: user.id
            };

            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(data_to_send)
            });

            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "The request failed when trying to join the room."
                );
                throw error;
            }

            await context.commit('setNewUser', response_data.result);

        } catch (error) {
            console.log(error)
            return error;
        }
    },

    async setVote(context, payload) {
        try {
            await context.commit('setVote', payload);
            const userAutheticated = await context.dispatch('getUserAuthenticated');
            context.dispatch('sendVote', userAutheticated);

        } catch (error) {
            console.log(error);
            return error;
        }
    },

    async sendVote(context, payload) {
        try {
            const url = process.env.VUE_APP_ROOT_API + 'api/v1/giveVote';
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }

            const result = await fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },

                body: JSON.stringify(payload.pivot)
            });

            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "The request failed to the vote."
                );
                throw error;
            }

            context.commit('setVoteResponse', response_data.result);

        } catch (error) {
            console.log(error);
            return error;
        }
    },

    async getDetails(context, payload) {
        try {
            const token = await context.dispatch("getToken");
            if (!token) {
                throw new Error("The token does not exist");
            }

            const url = process.env.VUE_APP_ROOT_API + 'api/v1/UserRoomVote?room_id='+payload.room_id;
            const result = await fetch(url, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json",
                    "Authorization": `Bearer ${token}`
                },
            })

            const response_data = await result.json();

            if (!result.ok) {
                const error = new Error(
                    response_data.message ||
                    "The request fails when trying to get the rooms."
                );
                throw error;
            }
            await context.commit('setUserVotes', response_data.result);

        } catch (error) {
            console.log(error);
            return errro;
        }
    },

    async getUserAuthenticated(context, __) {
        const { id } = await JSON.parse(localStorage.getItem('user'));
        return await context.state.room_users.find(user => user.id == id);
    }
};
