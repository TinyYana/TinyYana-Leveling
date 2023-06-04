/**
 * An interface that represents a member data object.
 * @interface Member
 */
interface Member {
    /**
     * A property that maps a member ID to a member data object.
     * @name Member#id
     * @type {Object}
     * @property {number} level The level of the member.
     * @property {number} experience The experience of the member.
     * @property {number} currency The currency of the member.
     */
    [id: string]: {
        level: number;
        experience: number;
        currency: number;
    };
}

export default Member;
